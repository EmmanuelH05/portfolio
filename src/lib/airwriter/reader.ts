/** Loads the digits model once and turns strokes into a reading. */
import { createDigitModel, type DigitModel } from './model';
import { strokesToImage, toModelInput, type Gray, type Stroke } from './preprocess';

export const MODEL_URL = '/airwriter/model/digits.bin';

let pending: Promise<DigitModel> | null = null;

/** Fetches the 540 KB weights on first use and reuses them after. A failed load can be retried. */
export function loadDigitModel(): Promise<DigitModel> {
  pending ??= fetch(MODEL_URL)
    .then((response) => {
      if (!response.ok) throw new Error(`Model download failed with ${response.status}`);
      return response.arrayBuffer();
    })
    .then((buffer) => createDigitModel(new Float32Array(buffer)))
    .catch((error) => {
      pending = null;
      throw error;
    });
  return pending;
}

export interface Reading {
  digit: number;
  /** The model's softmax probability for that digit, 0 to 1. */
  confidence: number;
  /** Preprocessing plus inference, in the visitor's browser. */
  ms: number;
  /** The 28x28 image the model actually read. */
  image: Gray;
}

/** The app treats anything under this as unsure (airwriter's CONFIDENCE_THRESHOLD). */
export const CONFIDENT = 0.9;

export function readStrokes(model: DigitModel, strokes: Stroke[]): Reading | null {
  const started = performance.now();
  const image = strokesToImage(strokes);
  if (!image) return null;
  const probabilities = model.predict(toModelInput(image));
  const confidence = Math.max(...probabilities);
  return { digit: probabilities.indexOf(confidence), confidence, ms: performance.now() - started, image };
}
