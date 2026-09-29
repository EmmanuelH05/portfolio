import { describe, expect, test } from 'bun:test';
import fs from 'node:fs';
import path from 'node:path';
import { PARAMETER_COUNT, createDigitModel } from '../src/lib/airwriter/model';
import blurFixture from './fixtures/airwriter-blur-parity.json';
import fixture from './fixtures/airwriter-onnx-parity.json';

const ROOT = path.join(import.meta.dir, '..');
const bytes = fs.readFileSync(path.join(ROOT, 'public/airwriter/model/digits.bin'));
const weights = new Float32Array(bytes.buffer, bytes.byteOffset, bytes.byteLength / 4);
const model = createDigitModel(weights);

describe('digits model', () => {
  test('the weights file holds exactly the network\'s 135,114 parameters', () => {
    expect(PARAMETER_COUNT).toBe(135_114);
    expect(weights.length).toBe(PARAMETER_COUNT);
  });

  test('matches the original ONNX model on every reference input', () => {
    fixture.inputs.forEach((input, i) => {
      const probabilities = model.predict(Float32Array.from(input));
      const expected = fixture.outputs[i];
      const worst = Math.max(...Array.from(probabilities, (p, k) => Math.abs(p - expected[k])));
      expect(worst).toBeLessThan(1e-5);
    });
  });

  test('rejects an input of the wrong size', () => {
    expect(() => model.predict(new Float32Array(100))).toThrow();
  });
});

import { blur5, centerByMass, crop, resizeArea, roundHalfEven, strokesToImage, toModelInput, type Stroke } from '../src/lib/airwriter/preprocess';

const image = (width: number, height: number, values: number[]) => ({ width, height, data: Uint8ClampedArray.from(values) });
const argmax = (values: Float32Array) => values.indexOf(Math.max(...values));
const read = (strokes: Stroke[]) => {
  const pixels = strokesToImage(strokes);
  if (!pixels) throw new Error('nothing drawn');
  return argmax(model.predict(toModelInput(pixels)));
};
const arc = (cx: number, cy: number, rx: number, ry: number, from: number, to: number, steps = 40) =>
  Array.from({ length: steps + 1 }, (_, i) => {
    const t = from + ((to - from) * i) / steps;
    return { x: cx + rx * Math.cos(t), y: cy + ry * Math.sin(t) };
  });

describe('stroke preprocessing', () => {
  test('rounds halves to even, like Python', () => {
    expect([0.5, 1.5, 2.5, -0.5, 2.4, 2.6].map((v) => roundHalfEven(v) + 0)).toEqual([0, 2, 2, 0, 2, 3]);
  });

  test('crop keeps just the drawn pixels, and a blank image crops to nothing', () => {
    const cropped = crop(image(3, 3, [0, 0, 0, 0, 9, 7, 0, 0, 0]));
    expect(cropped).toEqual(image(2, 1, [9, 7]));
    expect(crop(image(2, 2, [0, 0, 0, 0]))).toBeNull();
  });

  test('area resize averages whole blocks', () => {
    const resized = resizeArea(image(4, 2, [10, 30, 100, 100, 50, 70, 0, 0]), 2, 1);
    expect(Array.from(resized.data)).toEqual([40, 50]);
  });

  test('blur keeps a flat image flat', () => {
    const flat = blur5(image(6, 6, new Array(36).fill(120)));
    expect(new Set(flat.data)).toEqual(new Set([120]));
  });

  test('blur matches OpenCV\'s GaussianBlur((5, 5), 0) pixel for pixel', () => {
    for (const { name, width, height, input, expected } of blurFixture.cases) {
      expect({ name, pixels: Array.from(blur5(image(width, height, input)).data) }).toEqual({ name, pixels: expected });
    }
  });

  test('center of mass lands on the middle of the 28x28 field', () => {
    const centered = centerByMass(image(3, 3, [0, 0, 0, 0, 255, 0, 0, 0, 0]));
    expect(centered.width).toBe(28);
    expect(centered.data[14 * 28 + 14]).toBe(255);
  });

  test('nothing drawn gives no image', () => {
    expect(strokesToImage([])).toBeNull();
  });

  test('the drawn character fills 20 px on its longer side', () => {
    const pixels = strokesToImage([[{ x: 0, y: 0 }, { x: 1, y: 1 }]])!;
    const rows = new Set<number>();
    pixels.data.forEach((v, i) => v > 0 && rows.add(Math.floor(i / 28)));
    // 20 px of content plus the blur's two-pixel spread on each side.
    expect(rows.size).toBeGreaterThanOrEqual(20);
    expect(rows.size).toBeLessThanOrEqual(24);
  });
});

describe('strokes to prediction, end to end', () => {
  test('a vertical line reads as 1', () => {
    expect(read([[{ x: 0, y: 0 }, { x: 0.02, y: 1 }]])).toBe(1);
  });

  test('an oval reads as 0', () => {
    expect(read([arc(0.5, 0.5, 0.32, 0.5, 0, Math.PI * 2, 60)])).toBe(0);
  });

  test('a bar and a slash read as 7', () => {
    expect(read([[{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0.35, y: 1.4 }]])).toBe(7);
  });

  test('the same 7 in screen pixels, at any size or position, still reads as 7', () => {
    const scaled = [[{ x: 300, y: 120 }, { x: 420, y: 120 }, { x: 342, y: 288 }]];
    expect(read(scaled)).toBe(7);
  });

  test('two strokes make a 4', () => {
    expect(
      read([
        [{ x: 0.6, y: 0 }, { x: 0, y: 0.75 }, { x: 0.85, y: 0.75 }],
        [{ x: 0.6, y: 0.3 }, { x: 0.6, y: 1.2 }],
      ]),
    ).toBe(4);
  });
});

import { classifyPose, createOneEuro, createPenMachine, detectFingers, isClearPose, type Fingers } from '../src/lib/airwriter/gesture';

/** 21 landmarks for an upright hand with the given fingers extended. */
function hand(up: Partial<Fingers>) {
  const points = Array.from({ length: 21 }, () => ({ x: 0.5, y: 0.9 }));
  points[9] = { x: 0.5, y: 0.7 }; // middle knuckle: palm size 0.2
  points[17] = { x: 0.62, y: 0.72 }; // pinky knuckle
  const finger = (tip: number, pip: number, x: number, extended?: boolean) => {
    points[pip] = { x, y: 0.55 };
    points[tip] = { x, y: extended ? 0.3 : 0.75 };
  };
  finger(8, 6, 0.44, up.index);
  finger(12, 10, 0.5, up.middle);
  finger(16, 14, 0.56, up.ring);
  finger(20, 18, 0.62, up.pinky);
  points[3] = { x: 0.35, y: 0.75 };
  points[4] = up.thumb ? { x: 0.2, y: 0.7 } : { x: 0.45, y: 0.8 };
  return points;
}
const POINT = { index: true };
const PEACE = { index: true, middle: true };
const PALM = { thumb: true, index: true, middle: true, ring: true, pinky: true };

describe('finger detection', () => {
  test('reads which fingers are up', () => {
    expect(detectFingers(hand(PEACE))).toEqual({ thumb: false, index: true, middle: true, ring: false, pinky: false });
    expect(detectFingers(hand(PALM))).toEqual({ thumb: true, index: true, middle: true, ring: true, pinky: true });
  });

  test('maps poses to pen states', () => {
    expect(classifyPose(detectFingers(hand(POINT)))).toBe('draw');
    expect(classifyPose(detectFingers(hand(PEACE)))).toBe('hover');
    expect(classifyPose(detectFingers(hand({ index: true, middle: true, ring: true })))).toBeNull();
    expect(isClearPose(detectFingers(hand(PALM)))).toBe(true);
    expect(isClearPose(detectFingers(hand({})))).toBe(true);
  });
});

describe('pen state machine', () => {
  const run = (machine: ReturnType<typeof createPenMachine>, up: Partial<Fingers> | null, frames: number) =>
    Array.from({ length: frames }, () => machine.update(up ? detectFingers(hand(up)) : null)).flat();

  test('a pose has to hold for 3 frames before the pen goes down', () => {
    const machine = createPenMachine();
    expect(run(machine, POINT, 2)).toEqual([]);
    expect(run(machine, POINT, 1)).toEqual(['stroke-started']);
    expect(machine.state).toBe('draw');
  });

  test('lifting the pen and hovering for 25 frames asks for a prediction, once', () => {
    const machine = createPenMachine();
    run(machine, POINT, 5);
    const events = run(machine, PEACE, 3 + 30);
    expect(events.filter((e) => e === 'stroke-ended')).toHaveLength(1);
    expect(events.filter((e) => e === 'predict')).toHaveLength(1);
  });

  test('the dwell bar fills while hovering after a stroke', () => {
    const machine = createPenMachine();
    run(machine, POINT, 5);
    run(machine, PEACE, 3 + 10);
    expect(machine.dwell).toBeGreaterThan(0.3);
    expect(machine.dwell).toBeLessThan(0.5);
  });

  test('hovering with nothing drawn never predicts', () => {
    const machine = createPenMachine();
    expect(run(machine, PEACE, 60)).not.toContain('predict');
  });

  test('an open palm held for 8 frames clears', () => {
    const machine = createPenMachine();
    run(machine, POINT, 5);
    expect(run(machine, PALM, 7)).toEqual([]);
    expect(run(machine, PALM, 1)).toEqual(['stroke-ended', 'cleared']);
  });

  test('a brief tracking dropout keeps the stroke; a long one ends it', () => {
    const machine = createPenMachine();
    run(machine, POINT, 5);
    expect(run(machine, null, 4)).toEqual([]);
    expect(machine.state).toBe('draw');
    expect(run(machine, null, 1)).toEqual(['stroke-ended']);
    expect(machine.state).toBe('idle');
  });
});

describe('one-euro smoothing', () => {
  test('passes the first point through and smooths a jittery still hand', () => {
    const filter = createOneEuro();
    expect(filter.update({ x: 0.5, y: 0.5 }, 0)).toEqual({ x: 0.5, y: 0.5 });
    let last = { x: 0.5, y: 0.5 };
    for (let i = 1; i <= 30; i++) last = filter.update({ x: 0.5 + (i % 2 ? 0.01 : -0.01), y: 0.5 }, i / 30);
    expect(Math.abs(last.x - 0.5)).toBeLessThan(0.01);
  });

  test('keeps up with a fast, steady move', () => {
    const filter = createOneEuro();
    let last = { x: 0, y: 0 };
    for (let i = 0; i <= 30; i++) last = filter.update({ x: i / 30, y: 0 }, i / 30);
    expect(last.x).toBeGreaterThan(0.9);
  });
});

import { TASKS_VISION_VERSION } from '../src/lib/airwriter/handTracker';

test('the CDN wasm version matches the installed @mediapipe/tasks-vision', () => {
  const installed = JSON.parse(fs.readFileSync(path.join(ROOT, 'node_modules/@mediapipe/tasks-vision/package.json'), 'utf8'));
  expect(TASKS_VISION_VERSION).toBe(installed.version);
});
