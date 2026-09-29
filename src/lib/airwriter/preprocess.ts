/**
 * Strokes to the model's 28x28 input, ported from airwriter's canvas/normalize.py so the browser
 * feeds the network exactly what it was trained on (the MNIST convention EMNIST was built with):
 * render large and anti-aliased, crop, fit the longer side to 20 px with area resampling, blur
 * like a scan, then center by center of mass in a 28x28 field. Pure TypeScript, no canvas.
 */

export interface Point {
  x: number;
  y: number;
}
export type Stroke = Point[];

export const TARGET_SIZE = 28;
const CONTENT_SIZE = 20;
const RENDER_SIZE = 280;
const RENDER_THICKNESS = 18;

/** A grayscale image, row-major, values 0 to 255. */
export interface Gray {
  width: number;
  height: number;
  data: Uint8ClampedArray;
}

const gray = (width: number, height: number): Gray => ({ width, height, data: new Uint8ClampedArray(width * height) });

function distanceToSegment(px: number, py: number, a: Point, b: Point): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const lengthSquared = dx * dx + dy * dy;
  const t = lengthSquared === 0 ? 0 : Math.max(0, Math.min(1, ((px - a.x) * dx + (py - a.y) * dy) / lengthSquared));
  return Math.hypot(px - (a.x + t * dx), py - (a.y + t * dy));
}

/** Paints one anti-aliased thick segment (round caps) into `image`, keeping the brighter value. */
function paintSegment(image: Gray, a: Point, b: Point, radius: number) {
  const x0 = Math.max(0, Math.floor(Math.min(a.x, b.x) - radius - 1));
  const x1 = Math.min(image.width - 1, Math.ceil(Math.max(a.x, b.x) + radius + 1));
  const y0 = Math.max(0, Math.floor(Math.min(a.y, b.y) - radius - 1));
  const y1 = Math.min(image.height - 1, Math.ceil(Math.max(a.y, b.y) + radius + 1));
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      // Pixel centers, with a one-pixel soft edge for anti-aliasing.
      const coverage = radius + 0.5 - distanceToSegment(x + 0.5, y + 0.5, a, b);
      if (coverage <= 0) continue;
      const value = Math.round(Math.min(1, coverage) * 255);
      const i = y * image.width + x;
      if (value > image.data[i]) image.data[i] = value;
    }
  }
}

/** Renders strokes into a 280x280 canvas, aspect ratio preserved. Null when there is nothing to draw. */
export function rasterize(strokes: Stroke[]): Gray | null {
  const points = strokes.flat();
  if (points.length === 0) return null;

  const minX = Math.min(...points.map((p) => p.x));
  const minY = Math.min(...points.map((p) => p.y));
  const width = Math.max(...points.map((p) => p.x)) - minX;
  const height = Math.max(...points.map((p) => p.y)) - minY;
  // A dot or an axis-aligned line has zero extent on one axis; keep the scale finite.
  const span = Math.max(width, height, 1e-6);

  const padding = RENDER_THICKNESS;
  const usable = RENDER_SIZE - 2 * padding;
  const scale = usable / span;
  const offsetX = padding + (usable - width * scale) / 2;
  const offsetY = padding + (usable - height * scale) / 2;
  // Truncated to whole pixels, like the int() casts in normalize.py.
  const toPixel = (p: Point): Point => ({
    x: Math.trunc(offsetX + (p.x - minX) * scale),
    y: Math.trunc(offsetY + (p.y - minY) * scale),
  });

  const canvas = gray(RENDER_SIZE, RENDER_SIZE);
  const radius = RENDER_THICKNESS / 2;
  for (const stroke of strokes) {
    const pixels = stroke.map(toPixel);
    if (pixels.length === 1) paintSegment(canvas, pixels[0], pixels[0], radius);
    for (let i = 1; i < pixels.length; i++) paintSegment(canvas, pixels[i - 1], pixels[i], radius);
  }
  return canvas;
}

/** The smallest box around every nonzero pixel, or null for a blank image. */
export function crop(image: Gray): Gray | null {
  let minX = image.width;
  let minY = image.height;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < image.height; y++) {
    for (let x = 0; x < image.width; x++) {
      if (image.data[y * image.width + x] === 0) continue;
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }
  }
  if (maxX < 0) return null;
  const out = gray(maxX - minX + 1, maxY - minY + 1);
  for (let y = 0; y < out.height; y++) {
    for (let x = 0; x < out.width; x++) out.data[y * out.width + x] = image.data[(y + minY) * image.width + x + minX];
  }
  return out;
}

/** Area-average weights mapping `from` source pixels onto `to` destination pixels (OpenCV INTER_AREA). */
function areaWeights(from: number, to: number): { index: number; weight: number }[][] {
  const scale = from / to;
  return Array.from({ length: to }, (_, d) => {
    const start = d * scale;
    const end = start + scale;
    const taps = [];
    for (let s = Math.floor(start); s < Math.min(from, Math.ceil(end)); s++) {
      const overlap = Math.min(end, s + 1) - Math.max(start, s);
      if (overlap > 0) taps.push({ index: s, weight: overlap / scale });
    }
    return taps;
  });
}

/** Downsamples with area averaging, one axis at a time, rounding to whole values like a uint8 resize. */
export function resizeArea(image: Gray, width: number, height: number): Gray {
  const columns = areaWeights(image.width, width);
  const rows = areaWeights(image.height, height);
  const horizontal = new Float32Array(width * image.height);
  for (let y = 0; y < image.height; y++) {
    for (let x = 0; x < width; x++) {
      let sum = 0;
      for (const { index, weight } of columns[x]) sum += image.data[y * image.width + index] * weight;
      horizontal[y * width + x] = sum;
    }
  }
  const out = gray(width, height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let sum = 0;
      for (const { index, weight } of rows[y]) sum += horizontal[index * width + x] * weight;
      out.data[y * width + x] = Math.round(sum);
    }
  }
  return out;
}

/**
 * cv2.GaussianBlur(image, (5, 5), 0) with reflect-101 borders. For sigma 0 and kernels up to 7,
 * OpenCV skips the sigma formula and uses a fixed binomial kernel, [1, 4, 6, 4, 1] / 16.
 */
export function blur5(image: Gray): Gray {
  const kernel = [1, 4, 6, 4, 1].map((v) => v / 16);
  const reflect = (i: number, n: number) => {
    if (n === 1) return 0;
    let j = i;
    while (j < 0 || j >= n) j = j < 0 ? -j : 2 * (n - 1) - j;
    return j;
  };
  const { width, height } = image;
  const horizontal = new Float32Array(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let sum = 0;
      for (let k = -2; k <= 2; k++) sum += image.data[y * width + reflect(x + k, width)] * kernel[k + 2];
      horizontal[y * width + x] = sum;
    }
  }
  const out = gray(width, height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let sum = 0;
      for (let k = -2; k <= 2; k++) sum += horizontal[reflect(y + k, height) * width + x] * kernel[k + 2];
      out.data[y * width + x] = Math.round(sum);
    }
  }
  return out;
}

/** Python's round(): halves go to the even neighbor. */
export const roundHalfEven = (value: number) => {
  const floor = Math.floor(value);
  const fraction = value - floor;
  if (fraction !== 0.5) return Math.round(value);
  return floor % 2 === 0 ? floor : floor + 1;
};

/** Places `image` in a 28x28 field with its center of mass on the field's center. */
export function centerByMass(image: Gray, target = TARGET_SIZE): Gray {
  const field = gray(target, target);
  let total = 0;
  let sumX = 0;
  let sumY = 0;
  for (let y = 0; y < image.height; y++) {
    for (let x = 0; x < image.width; x++) {
      const v = image.data[y * image.width + x];
      total += v;
      sumX += x * v;
      sumY += y * v;
    }
  }
  if (total <= 0) return field;
  const offsetX = roundHalfEven(target / 2 - sumX / total);
  const offsetY = roundHalfEven(target / 2 - sumY / total);
  for (let y = 0; y < image.height; y++) {
    const ty = y + offsetY;
    if (ty < 0 || ty >= target) continue;
    for (let x = 0; x < image.width; x++) {
      const tx = x + offsetX;
      if (tx < 0 || tx >= target) continue;
      field.data[ty * target + tx] = image.data[y * image.width + x];
    }
  }
  return field;
}

/** The full pipeline: strokes to the 28x28 image the model reads. Null when there is nothing drawn. */
export function strokesToImage(strokes: Stroke[]): Gray | null {
  const canvas = rasterize(strokes);
  const cropped = canvas && crop(canvas);
  if (!cropped) return null;
  const wide = cropped.width >= cropped.height;
  const width = wide ? CONTENT_SIZE : Math.max(1, roundHalfEven((cropped.width * CONTENT_SIZE) / cropped.height));
  const height = wide ? Math.max(1, roundHalfEven((cropped.height * CONTENT_SIZE) / cropped.width)) : CONTENT_SIZE;
  return centerByMass(blur5(resizeArea(cropped, width, height)));
}

/** Scales a 28x28 image to the model's [0, 1] floats. */
export const toModelInput = (image: Gray): Float32Array => Float32Array.from(image.data, (v) => v / 255);
