/** MediaPipe's hand landmarker, loaded only when a visitor turns the camera on. */
import type { HandLandmarker } from '@mediapipe/tasks-vision';

/** Must match the installed @mediapipe/tasks-vision version (tests/airwriter.test.ts checks). */
export const TASKS_VISION_VERSION = '1.0.1';
const WASM_BASE = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${TASKS_VISION_VERSION}/wasm`;
// The same model airwriter downloads in its README.
const HAND_MODEL =
  'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task';

/** Loads the wasm runtime and the hand model (about 8 MB together), on the GPU when the browser allows. */
export async function createHandTracker(): Promise<HandLandmarker> {
  const { FilesetResolver, HandLandmarker } = await import('@mediapipe/tasks-vision');
  const files = await FilesetResolver.forVisionTasks(WASM_BASE);
  const options = (delegate: 'GPU' | 'CPU') => ({
    baseOptions: { modelAssetPath: HAND_MODEL, delegate },
    runningMode: 'VIDEO' as const,
    numHands: 1,
  });
  try {
    return await HandLandmarker.createFromOptions(files, options('GPU'));
  } catch {
    // Some browsers have no WebGL for the GPU delegate; the CPU one is slower but works.
    return HandLandmarker.createFromOptions(files, options('CPU'));
  }
}
