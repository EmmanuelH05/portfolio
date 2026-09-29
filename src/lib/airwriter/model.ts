/**
 * The airwriter digits CNN, run in plain TypeScript so the browser needs no ML runtime.
 *
 * Same network as airwriter's model.py (and the ONNX graph it exports): three 3x3 conv, ReLU
 * and 2x2 max-pool blocks (28 -> 26 -> 13, 13 -> 13 -> 6, 6 -> 4 -> 2), flatten to 512, then
 * dense 64, 128 and 10 with ReLU between and softmax at the end. Dropout is inference-free.
 */

/** Parameter counts in the order public/airwriter/model/digits.bin stores them. */
const LAYOUT = {
  conv1Weight: 32 * 1 * 9,
  conv1Bias: 32,
  conv2Weight: 64 * 32 * 9,
  conv2Bias: 64,
  conv3Weight: 128 * 64 * 9,
  conv3Bias: 128,
  dense1Weight: 64 * 512,
  dense1Bias: 64,
  dense2Weight: 128 * 64,
  dense2Bias: 128,
  dense3Weight: 10 * 128,
  dense3Bias: 10,
} as const;

export const PARAMETER_COUNT = Object.values(LAYOUT).reduce((sum, n) => sum + n, 0);
export const INPUT_SIZE = 28;

type Weights = Record<keyof typeof LAYOUT, Float32Array>;

function slice(all: Float32Array): Weights {
  if (all.length !== PARAMETER_COUNT) {
    throw new Error(`Expected ${PARAMETER_COUNT} weights, got ${all.length}`);
  }
  let offset = 0;
  const entries = Object.entries(LAYOUT).map(([name, count]) => {
    const part = all.subarray(offset, offset + count);
    offset += count;
    return [name, part];
  });
  return Object.fromEntries(entries) as Weights;
}

/** A 3x3 convolution with stride 1 and `pad` zero padding, then ReLU. Layout is channel, row, column. */
function conv3x3Relu(
  input: Float32Array,
  inChannels: number,
  size: number,
  weight: Float32Array,
  bias: Float32Array,
  outChannels: number,
  pad: number,
): { data: Float32Array; size: number } {
  const outSize = size + 2 * pad - 2;
  const out = new Float32Array(outChannels * outSize * outSize);
  for (let oc = 0; oc < outChannels; oc++) {
    for (let y = 0; y < outSize; y++) {
      for (let x = 0; x < outSize; x++) {
        let sum = bias[oc];
        for (let ic = 0; ic < inChannels; ic++) {
          const kernel = (oc * inChannels + ic) * 9;
          const plane = ic * size * size;
          for (let ky = 0; ky < 3; ky++) {
            const sy = y + ky - pad;
            if (sy < 0 || sy >= size) continue;
            for (let kx = 0; kx < 3; kx++) {
              const sx = x + kx - pad;
              if (sx < 0 || sx >= size) continue;
              sum += input[plane + sy * size + sx] * weight[kernel + ky * 3 + kx];
            }
          }
        }
        out[(oc * outSize + y) * outSize + x] = sum > 0 ? sum : 0;
      }
    }
  }
  return { data: out, size: outSize };
}

/** 2x2 max-pool with stride 2, dropping an odd last row and column (floor), as PyTorch does. */
function maxPool2(input: Float32Array, channels: number, size: number): { data: Float32Array; size: number } {
  const outSize = Math.floor(size / 2);
  const out = new Float32Array(channels * outSize * outSize);
  for (let c = 0; c < channels; c++) {
    const plane = c * size * size;
    for (let y = 0; y < outSize; y++) {
      for (let x = 0; x < outSize; x++) {
        const i = plane + 2 * y * size + 2 * x;
        out[(c * outSize + y) * outSize + x] = Math.max(input[i], input[i + 1], input[i + size], input[i + size + 1]);
      }
    }
  }
  return { data: out, size: outSize };
}

/** y = W x + b, W stored [out, in] (PyTorch Linear, ONNX Gemm with transB). */
function dense(input: Float32Array, weight: Float32Array, bias: Float32Array, relu: boolean): Float32Array {
  const outSize = bias.length;
  const inSize = input.length;
  const out = new Float32Array(outSize);
  for (let o = 0; o < outSize; o++) {
    let sum = bias[o];
    const row = o * inSize;
    for (let i = 0; i < inSize; i++) sum += weight[row + i] * input[i];
    out[o] = relu && sum < 0 ? 0 : sum;
  }
  return out;
}

function softmax(logits: Float32Array): Float32Array {
  const max = Math.max(...logits);
  const exps = logits.map((v) => Math.exp(v - max));
  const total = exps.reduce((sum, v) => sum + v, 0);
  return exps.map((v) => v / total);
}

export interface DigitModel {
  /** Class probabilities for digits 0 to 9, from a 28x28 image in [0, 1], row-major. */
  predict(image: Float32Array): Float32Array;
}

export function createDigitModel(allWeights: Float32Array): DigitModel {
  const w = slice(allWeights);
  return {
    predict(image) {
      if (image.length !== INPUT_SIZE * INPUT_SIZE) {
        throw new Error(`Expected a ${INPUT_SIZE}x${INPUT_SIZE} image, got ${image.length} values`);
      }
      const c1 = maxPool2(conv3x3Relu(image, 1, 28, w.conv1Weight, w.conv1Bias, 32, 0).data, 32, 26);
      const c2 = maxPool2(conv3x3Relu(c1.data, 32, c1.size, w.conv2Weight, w.conv2Bias, 64, 1).data, 64, 13);
      const c3 = conv3x3Relu(c2.data, 64, c2.size, w.conv3Weight, w.conv3Bias, 128, 0);
      const flat = maxPool2(c3.data, 128, c3.size).data;
      const d1 = dense(flat, w.dense1Weight, w.dense1Bias, true);
      const d2 = dense(d1, w.dense2Weight, w.dense2Bias, true);
      return softmax(dense(d2, w.dense3Weight, w.dense3Bias, false));
    },
  };
}
