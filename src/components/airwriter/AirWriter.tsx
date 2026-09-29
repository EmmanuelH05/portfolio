'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { HandLandmarker } from '@mediapipe/tasks-vision';
import { PEN_LANDMARK, createOneEuro, createPenMachine, detectFingers, type PenState } from '@/lib/airwriter/gesture';
import { createHandTracker } from '@/lib/airwriter/handTracker';
import type { DigitModel } from '@/lib/airwriter/model';
import type { Gray, Point, Stroke } from '@/lib/airwriter/preprocess';
import { CONFIDENT, loadDigitModel, readStrokes, type Reading } from '@/lib/airwriter/reader';
import * as styles from '@/styles/components/AirWriter';

type Mode = 'idle' | 'loading' | 'camera' | 'draw';

/** On the drawing pad, the pause after the last stroke before the digit is read. */
const DRAW_SUBMIT_MS = 800;
/** Minimum spacing between kept points, in pixels, so a still finger doesn't pile up samples. */
const MIN_POINT_SPACING = 2.5;
const CAMERA: MediaStreamConstraints = {
  video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
  audio: false,
};

const INSTRUCTIONS: Record<Mode, string> = {
  idle: 'Point one finger at your camera to write, lift two fingers to stop, and hold still to hand it in. Or draw it with your mouse or finger. The model from my airwriter project reads it right here.',
  loading: 'Loading the hand tracker. It is about 8 MB, and only the first time.',
  camera: 'Index finger up to write. Two fingers up lifts the pen; hold them there to hand the digit in. An open palm or a fist clears.',
  draw: 'Draw one digit, 0 to 9. It gets read as soon as you stop.',
};

/** Adds `point` to the last stroke unless it's too close to the previous one. Returns new strokes. */
function appendPoint(strokes: Stroke[], point: Point): Stroke[] {
  const last = strokes[strokes.length - 1];
  if (!last) return strokes;
  const previous = last[last.length - 1];
  if (previous && Math.hypot(previous.x - point.x, previous.y - point.y) < MIN_POINT_SPACING) return strokes;
  return [...strokes.slice(0, -1), [...last, point]];
}

const isRejected = (result: PromiseSettledResult<unknown>): result is PromiseRejectedResult => result.status === 'rejected';

function paintPreview(canvas: HTMLCanvasElement | null, image: Gray) {
  const context = canvas?.getContext('2d');
  if (!context) return;
  const pixels = context.createImageData(image.width, image.height);
  image.data.forEach((value, i) => {
    pixels.data.set([value, value, value, 255], i * 4);
  });
  context.putImageData(pixels, 0, 0);
}

/** "Write a digit in the air": airwriter's hand tracking and digits model, running in the visitor's browser. */
export default function AirWriter() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewRef = useRef<HTMLCanvasElement>(null);
  const strokes = useRef<Stroke[]>([]);
  const isPointerDown = useRef(false);
  const model = useRef<DigitModel | null>(null);
  const tracker = useRef<HandLandmarker | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const submitTimer = useRef(0);
  /** Bumped every time the camera stops, so a start that is still loading can tell it was cancelled. */
  const attempt = useRef(0);
  const isMounted = useRef(true);
  const [mode, setMode] = useState<Mode>('idle');
  const [pen, setPen] = useState<{ state: PenState; dwell: number }>({ state: 'idle', dwell: 0 });
  const [reading, setReading] = useState<Reading | null>(null);
  const [error, setError] = useState<string | null>(null);

  const read = useCallback(() => {
    if (!model.current) return;
    const result = readStrokes(model.current, strokes.current);
    strokes.current = [];
    if (result) setReading(result);
  }, []);

  /** Stops the camera, and cancels a start that is still loading. */
  const stopCamera = useCallback(() => {
    attempt.current += 1;
    stream.current?.getTracks().forEach((track) => track.stop());
    stream.current = null;
  }, []);

  useEffect(() => {
    if (reading) paintPreview(previewRef.current, reading.image);
  }, [reading]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      stopCamera();
      tracker.current?.close();
      tracker.current = null;
      window.clearTimeout(submitTimer.current);
    };
  }, [stopCamera]);

  const cameraFailed = (cause: unknown) => {
    console.error('Air-writing camera failed to start', cause);
    const isBlocked = cause instanceof DOMException && cause.name === 'NotAllowedError';
    setError(
      isBlocked
        ? 'Camera access was blocked, so try drawing the digit instead.'
        : 'The camera or the hand tracker could not start here, so try drawing the digit instead.',
    );
    setMode('idle');
  };

  /** One tracker for the page's lifetime. A duplicate, or one that finishes loading after the page is gone, is closed. */
  const keepTracker = (loaded: HandLandmarker) => {
    if (loaded === tracker.current) return;
    if (tracker.current || !isMounted.current) loaded.close();
    else tracker.current = loaded;
  };

  const startCamera = async () => {
    stopCamera();
    const mine = attempt.current;
    const isCancelled = () => mine !== attempt.current;
    setError(null);
    setMode('loading');
    // allSettled, not all: if one part fails, a camera that did open still has to be stopped,
    // or its light stays on.
    const [loadedModel, loadedTracker, media] = await Promise.allSettled([
      loadDigitModel(),
      tracker.current ?? createHandTracker(),
      navigator.mediaDevices.getUserMedia(CAMERA),
    ]);
    if (loadedTracker.status === 'fulfilled') keepTracker(loadedTracker.value);
    if (
      media.status === 'rejected' ||
      loadedTracker.status === 'rejected' ||
      loadedModel.status === 'rejected' ||
      isCancelled()
    ) {
      if (media.status === 'fulfilled') media.value.getTracks().forEach((track) => track.stop());
      // The camera's error first, so a blocked camera gets its own message.
      const failure = [media, loadedTracker, loadedModel].find(isRejected);
      if (failure && !isCancelled()) cameraFailed(failure.reason);
      return;
    }
    model.current = loadedModel.value;
    stream.current = media.value;
    try {
      const video = videoRef.current;
      if (!video) throw new Error('The video element is missing');
      video.srcObject = media.value;
      await video.play();
    } catch (cause) {
      // Whatever cancelled it has already stopped this stream.
      if (isCancelled()) return;
      stopCamera();
      cameraFailed(cause);
      return;
    }
    if (isCancelled()) return;
    strokes.current = [];
    setMode('camera');
  };

  const startDrawing = async () => {
    stopCamera();
    const mine = attempt.current;
    setError(null);
    try {
      model.current = await loadDigitModel();
    } catch (cause) {
      console.error('Air-writing model failed to load', cause);
      if (mine !== attempt.current) return;
      setError('The model could not load. Check your connection and try again.');
      setMode('idle');
      return;
    }
    if (mine !== attempt.current) return;
    strokes.current = [];
    setMode('draw');
  };

  const clear = () => {
    window.clearTimeout(submitTimer.current);
    strokes.current = [];
    setReading(null);
  };

  const turnCameraOff = () => {
    stopCamera();
    strokes.current = [];
    setPen({ state: 'idle', dwell: 0 });
    setMode('idle');
  };

  // Tracks the hand (camera) and paints the strokes, every frame while the stage is live.
  useEffect(() => {
    if (mode !== 'camera' && mode !== 'draw') return;
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    const video = videoRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !stage || !context) return;
    const isCamera = mode === 'camera';
    const machine = createPenMachine();
    const smoother = createOneEuro();
    let frame = 0;
    let lastVideoTime = -1;
    let tip: Point | null = null;
    let shown = { state: 'idle' as PenState, dwell: 0 };

    const fit = () => {
      const { width, height } = stage.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(stage);

    // Camera points are in mirrored video pixels; the video is shown object-cover, so map them the same way.
    const stageMapping = (width: number, height: number) => {
      if (!isCamera || !video?.videoWidth) return (p: Point) => p;
      const scale = Math.max(width / video.videoWidth, height / video.videoHeight);
      const dx = (width - video.videoWidth * scale) / 2;
      const dy = (height - video.videoHeight * scale) / 2;
      return (p: Point): Point => ({ x: p.x * scale + dx, y: p.y * scale + dy });
    };

    const track = (now: number) => {
      const landmarker = tracker.current;
      if (!video || !landmarker || video.readyState < 2 || video.currentTime === lastVideoTime) return;
      lastVideoTime = video.currentTime;
      const hand = landmarker.detectForVideo(video, now).landmarks[0];
      // Mirrored, and in pixels rather than 0 to 1 on each axis, so a circle in the air stays a circle.
      const points = hand?.map((l) => ({ x: (1 - l.x) * video.videoWidth, y: l.y * video.videoHeight }));
      const events = machine.update(points ? detectFingers(points) : null);
      // Smoothed before it's scaled to pixels: the filter is tuned for 0 to 1 coordinates, like airwriter's.
      const fingertip = hand?.[PEN_LANDMARK];
      if (fingertip) {
        const smoothed = smoother.update({ x: 1 - fingertip.x, y: fingertip.y }, now / 1000);
        tip = { x: smoothed.x * video.videoWidth, y: smoothed.y * video.videoHeight };
      } else {
        tip = null;
        smoother.reset();
      }
      for (const event of events) {
        if (event === 'stroke-started') strokes.current = [...strokes.current, []];
        if (event === 'cleared') {
          strokes.current = [];
          setReading(null);
        }
        if (event === 'predict') read();
      }
      if (machine.state === 'draw' && tip) strokes.current = appendPoint(strokes.current, tip);
      if (machine.state !== shown.state || Math.abs(machine.dwell - shown.dwell) > 0.02) {
        shown = { state: machine.state, dwell: machine.dwell };
        setPen(shown);
      }
    };

    const paint = () => {
      const { width, height } = stage.getBoundingClientRect();
      const toStage = stageMapping(width, height);
      const ink = isCamera ? styles.INK.camera : styles.INK.draw;
      context.clearRect(0, 0, width, height);
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.lineWidth = ink.width;
      context.strokeStyle = ink.color;
      for (const stroke of strokes.current) {
        const points = stroke.map(toStage);
        if (!points.length) continue;
        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        // A single point still draws a dot.
        points.slice(1).forEach((p) => context.lineTo(p.x, p.y));
        if (points.length === 1) context.lineTo(points[0].x + 0.01, points[0].y);
        context.stroke();
      }
      if (isCamera && tip) {
        const p = toStage(tip);
        context.fillStyle = machine.state === 'draw' ? styles.INK.tipDraw : styles.INK.tipHover;
        context.beginPath();
        context.arc(p.x, p.y, styles.INK.tipRadius, 0, Math.PI * 2);
        context.fill();
      }
    };

    const loop = (now: number) => {
      try {
        if (isCamera) track(now);
      } catch (cause) {
        // The tracker can die mid-session, for example when the GPU context is lost. Say so instead of freezing.
        console.error('Air-writing hand tracking stopped', cause);
        stopCamera();
        setError('Hand tracking stopped, so try drawing the digit instead.');
        setMode('idle');
        return;
      }
      paint();
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [mode, read, stopCamera]);

  const pointAt = (event: React.PointerEvent<HTMLCanvasElement>): Point => {
    const box = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - box.left, y: event.clientY - box.top };
  };
  const onPointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (mode !== 'draw') return;
    event.currentTarget.setPointerCapture(event.pointerId);
    window.clearTimeout(submitTimer.current);
    isPointerDown.current = true;
    strokes.current = [...strokes.current, [pointAt(event)]];
  };
  const onPointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (isPointerDown.current) strokes.current = appendPoint(strokes.current, pointAt(event));
  };
  const onPointerUp = () => {
    if (!isPointerDown.current) return;
    isPointerDown.current = false;
    submitTimer.current = window.setTimeout(read, DRAW_SUBMIT_MS);
  };

  const isCamera = mode === 'camera';
  const isDrawing = mode === 'draw';
  const isLive = isCamera || isDrawing;
  const percent = reading ? Math.round(reading.confidence * 100) : 0;
  const isConfident = Boolean(reading && reading.confidence >= CONFIDENT);

  return (
    <section id="try" aria-labelledby="try-heading" className={styles.section}>
      <div className={styles.card}>
        <div ref={stageRef} className={styles.stage(isDrawing)}>
          {!isLive && (
            <Image src="/airwriter/write-draw.jpg" alt="" fill sizes={styles.posterSizes} className={styles.poster} />
          )}
          <video ref={videoRef} muted playsInline aria-label="Your camera, mirrored" className={styles.videoFor(isCamera)} />
          <canvas
            ref={canvasRef}
            aria-label={isDrawing ? 'Drawing pad: draw one digit' : undefined}
            className={styles.canvas(isDrawing)}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          />
          {mode === 'loading' && (
            <div className={styles.stageCenter}>
              <p className={styles.stageMessage}>Starting your camera and the hand tracker…</p>
            </div>
          )}
          {isCamera && (
            <p className={styles.hud}>
              <span className={styles.hudState(pen.state)}>{pen.state}</span> · runs on your device
            </p>
          )}
          {isCamera && pen.dwell > 0 && (
            <div className={styles.dwellTrack}>
              <div className={styles.dwellFill} style={styles.scaleX(pen.dwell)} />
            </div>
          )}
          {isDrawing && <p className={styles.drawHint}>Draw a digit here</p>}
        </div>

        <div className={styles.panel}>
          <p className={styles.kicker}>Try it · airwriter</p>
          <h2 id="try-heading" className={styles.heading}>
            Write a digit in the air.
          </h2>
          <p className={styles.instructions}>{INSTRUCTIONS[mode]}</p>

          <div className={styles.buttons}>
            {!isCamera && (
              <button type="button" onClick={startCamera} disabled={mode === 'loading'} className={styles.connectButton}>
                {mode === 'loading' ? 'Starting…' : 'Use my camera'}
              </button>
            )}
            {!isDrawing && (
              <button type="button" onClick={startDrawing} className={styles.resumeButton}>
                Draw instead
              </button>
            )}
            {isLive && (
              <button type="button" onClick={clear} className={styles.smallButton}>
                Clear
              </button>
            )}
            {isCamera && (
              <button type="button" onClick={turnCameraOff} className={styles.smallButton}>
                Turn camera off
              </button>
            )}
          </div>
          {error && (
            <p role="alert" className={styles.error}>
              {error}
            </p>
          )}

          <div aria-live="polite">
            {reading ? (
              <div className={styles.result}>
                <canvas ref={previewRef} width={28} height={28} aria-label="The 28 by 28 image the model read" className={styles.preview} />
                <p className={styles.digit(isConfident)}>{reading.digit}</p>
                <div className={styles.resultText}>
                  <p className={styles.resultLine}>
                    {isConfident
                      ? `I read a ${reading.digit}, ${percent}% sure.`
                      : `Maybe a ${reading.digit}? Only ${percent}% sure, so try it again.`}
                  </p>
                  <p className={styles.resultMeta}>Read in {reading.ms.toFixed(1)} ms on your device</p>
                </div>
              </div>
            ) : (
              <p className={styles.waiting}>Your digit shows up here, with the 28×28 image the model actually saw.</p>
            )}
          </div>

          <p className={styles.footnote}>
            Everything runs in your browser, and your camera feed never leaves your device. The model scores 99.64% on
            EMNIST test digits. Writing in the air is harder, and I haven&apos;t measured that yet.
          </p>
          <Link href="/projects/airwriter" className={styles.more}>
            How it works <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
