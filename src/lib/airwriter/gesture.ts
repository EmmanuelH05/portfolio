/**
 * Hand pose to pen events, ported from airwriter's gesture/fingers.py, gesture/state_machine.py
 * and tracking/smoothing.py, so the web demo behaves like the app: index finger up draws, index
 * and middle up lifts the pen, an open palm or a fist clears, and holding the pen up submits.
 */
import type { Point } from './preprocess';

/** MediaPipe hand landmark indices. */
const L = {
  wrist: 0,
  thumbIp: 3,
  thumbTip: 4,
  indexPip: 6,
  indexTip: 8,
  middleMcp: 9,
  middlePip: 10,
  middleTip: 12,
  ringPip: 14,
  ringTip: 16,
  pinkyMcp: 17,
  pinkyPip: 18,
  pinkyTip: 20,
} as const;

export const PEN_LANDMARK = L.indexTip;

// Fractions of palm size a tip must beat its PIP joint by: a dead zone against landmark noise.
const EXTENSION_MARGIN = 0.05;
const THUMB_MARGIN = 0.02;

export interface Fingers {
  thumb: boolean;
  index: boolean;
  middle: boolean;
  ring: boolean;
  pinky: boolean;
}

// Deliberately 2D: single-camera depth is too noisy to help.
const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);

/** A finger is extended when its tip is farther from the wrist than its PIP joint, which survives wrist rotation. */
export function detectFingers(landmarks: Point[]): Fingers {
  const wrist = landmarks[L.wrist];
  const palm = distance(wrist, landmarks[L.middleMcp]);
  if (palm <= 1e-6) return { thumb: false, index: false, middle: false, ring: false, pinky: false };
  const extended = (tip: number, pip: number) =>
    distance(wrist, landmarks[tip]) > distance(wrist, landmarks[pip]) + EXTENSION_MARGIN * palm;
  // The thumb folds across the palm, so it's measured against the pinky knuckle.
  const pinkyMcp = landmarks[L.pinkyMcp];
  return {
    thumb: distance(pinkyMcp, landmarks[L.thumbTip]) > distance(pinkyMcp, landmarks[L.thumbIp]) + THUMB_MARGIN * palm,
    index: extended(L.indexTip, L.indexPip),
    middle: extended(L.middleTip, L.middlePip),
    ring: extended(L.ringTip, L.ringPip),
    pinky: extended(L.pinkyTip, L.pinkyPip),
  };
}

export type PenState = 'idle' | 'hover' | 'draw';
export type PenEvent = 'stroke-started' | 'stroke-ended' | 'cleared' | 'predict';

/** Index alone draws; index and middle lift the pen. Anything else holds the current state. */
export function classifyPose(f: Fingers): PenState | null {
  if (f.index && !f.middle && !f.ring && !f.pinky) return 'draw';
  if (f.index && f.middle && !f.ring && !f.pinky) return 'hover';
  return null;
}

/** An open palm or a closed fist wipes the canvas. */
export function isClearPose(f: Fingers): boolean {
  const all = f.thumb && f.index && f.middle && f.ring && f.pinky;
  const none = !f.thumb && !f.index && !f.middle && !f.ring && !f.pinky;
  return all || none;
}

export const PEN_CONFIG = {
  /** Frames a new pose must hold before it counts. */
  debounceFrames: 3,
  /** Frames a lost hand is waited out before the stroke ends. */
  trackingGraceFrames: 5,
  /** Frames of pen-up hover, after drawing, before the character is read (about 0.8 s at 30 fps). */
  predictDwellFrames: 25,
  /** Frames the clear pose must be held, longer than debounce so a passing fist doesn't wipe. */
  clearHoldFrames: 8,
};

export interface PenMachine {
  readonly state: PenState;
  /** Progress through the submit countdown, 0 to 1, for the hold-to-submit bar. */
  readonly dwell: number;
  /** Advances one frame. `fingers` is null when no hand is found. */
  update(fingers: Fingers | null): PenEvent[];
  reset(): void;
}

export function createPenMachine(config = PEN_CONFIG): PenMachine {
  let state: PenState = 'idle';
  let candidate: PenState | null = null;
  let candidateFrames = 0;
  let lostFrames = 0;
  let hoverFrames = 0;
  let clearFrames = 0;
  let unpredicted = false;

  const reset = () => {
    state = 'idle';
    candidate = null;
    candidateFrames = 0;
    lostFrames = 0;
    hoverFrames = 0;
    clearFrames = 0;
    unpredicted = false;
  };

  const accrueDwell = (): PenEvent[] => {
    if (state !== 'hover' || !unpredicted) return [];
    hoverFrames += 1;
    if (hoverFrames < config.predictDwellFrames) return [];
    hoverFrames = 0;
    unpredicted = false;
    return ['predict'];
  };

  const transitionTo = (next: PenState): PenEvent[] => {
    const previous = state;
    state = next;
    candidate = null;
    candidateFrames = 0;
    const events: PenEvent[] = [];
    if (previous === 'draw' && next !== 'draw') events.push('stroke-ended');
    if (next === 'draw' && previous !== 'draw') {
      events.push('stroke-started');
      unpredicted = true;
      hoverFrames = 0;
    }
    return events;
  };

  return {
    get state() {
      return state;
    },
    get dwell() {
      return state === 'hover' && unpredicted ? Math.min(1, hoverFrames / config.predictDwellFrames) : 0;
    },
    reset,
    update(fingers) {
      if (!fingers) {
        lostFrames += 1;
        clearFrames = 0;
        if (lostFrames < config.trackingGraceFrames) return [];
        const events: PenEvent[] = state === 'draw' ? ['stroke-ended'] : [];
        state = 'idle';
        candidate = null;
        candidateFrames = 0;
        hoverFrames = 0;
        return events;
      }
      lostFrames = 0;

      if (isClearPose(fingers)) {
        clearFrames += 1;
        if (clearFrames < config.clearHoldFrames) return [];
        const events: PenEvent[] = state === 'draw' ? ['stroke-ended', 'cleared'] : ['cleared'];
        reset();
        // Still tracked, so hover rather than idle.
        state = 'hover';
        return events;
      }
      clearFrames = 0;

      const desired = classifyPose(fingers);
      if (desired === null) {
        candidate = null;
        candidateFrames = 0;
        return accrueDwell();
      }
      if (desired !== state) {
        candidateFrames = desired === candidate ? candidateFrames + 1 : 1;
        candidate = desired;
        if (candidateFrames < config.debounceFrames) return accrueDwell();
        return transitionTo(desired);
      }
      candidate = null;
      candidateFrames = 0;
      return accrueDwell();
    },
  };
}

/** Speed-adaptive low-pass (One-Euro). beta is large because coordinates are normalized to [0, 1]. */
export function createOneEuro({ minCutoff = 1, beta = 10, dCutoff = 1 } = {}) {
  const alpha = (cutoff: number, dt: number) => 1 / (1 + 1 / (2 * Math.PI * cutoff) / dt);
  let previous: { x: number; y: number; t: number } | null = null;
  let filtered = { x: 0, y: 0 };
  // Null until the second sample: the first speed estimate is taken as is, like the Python filter.
  let speed: { x: number; y: number } | null = null;

  return {
    /** `t` in seconds. */
    update(point: Point, t: number): Point {
      if (!previous) {
        previous = { ...point, t };
        filtered = { x: point.x, y: point.y };
        speed = null;
        return point;
      }
      const dt = t - previous.t > 0 ? t - previous.t : 1e-3;
      const dAlpha = alpha(dCutoff, dt);
      const raw = { x: (point.x - previous.x) / dt, y: (point.y - previous.y) / dt };
      speed = speed
        ? { x: dAlpha * raw.x + (1 - dAlpha) * speed.x, y: dAlpha * raw.y + (1 - dAlpha) * speed.y }
        : raw;
      const a = alpha(minCutoff + beta * Math.hypot(speed.x, speed.y), dt);
      filtered = { x: a * point.x + (1 - a) * filtered.x, y: a * point.y + (1 - a) * filtered.y };
      previous = { ...point, t };
      return filtered;
    },
    reset() {
      previous = null;
    },
  };
}
