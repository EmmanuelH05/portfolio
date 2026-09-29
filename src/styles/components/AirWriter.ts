import { pillLinkEnd } from '@/styles/buttons';

export { connectButton, pillButton as smallButton, resumeButton } from '@/styles/buttons';

export const section = 'mt-12 scroll-mt-6 md:mt-20';
export const card = 'grid overflow-clip rounded-[1.75rem] bg-shell md:grid-cols-[1.15fr_1fr]';

/** The camera feed or the drawing pad. Dark behind the camera, light and gridded for drawing. */
export const stage = (isDrawing: boolean) =>
  `relative aspect-[4/3] w-full overflow-clip ${
    isDrawing ? 'dot-grid bg-white/60' : 'bg-[#0d120f]'
  }`;
export const poster = 'object-cover opacity-80';
export const posterSizes = '(min-width: 768px) 55vw, 100vw';
/** Mirrored, so moving your hand right moves it right on screen. Kept in the page while hidden, so the stream can attach. */
export const videoFor = (isCamera: boolean) =>
  isCamera ? 'absolute inset-0 h-full w-full -scale-x-100 object-cover' : 'hidden';
/** Only the drawing pad takes touches; otherwise a swipe over the stage scrolls the page on a phone. */
export const canvas = (isDrawing: boolean) =>
  `absolute inset-0 h-full w-full ${isDrawing ? 'cursor-crosshair touch-none' : ''}`;
export const stageCenter = 'absolute inset-0 grid place-items-center p-6 text-center';
export const stageMessage = 'max-w-[20rem] rounded-2xl bg-[#0d120f]/80 px-5 py-4 text-sm leading-relaxed text-shell';
export const hud = 'absolute left-3 top-3 rounded-lg bg-[#0d120f]/75 px-2.5 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-shell';
export const hudState = (state: 'idle' | 'hover' | 'draw') =>
  state === 'draw' ? 'text-[#3dff9a]' : state === 'hover' ? 'text-[#00d2ff]' : 'text-shell/60';
export const drawHint = 'pointer-events-none absolute inset-x-0 bottom-3 text-center font-mono text-xs text-muted';
export const dwellTrack = 'absolute bottom-4 left-1/2 h-1.5 w-40 -translate-x-1/2 overflow-hidden rounded-full bg-white/25';
export const dwellFill = 'h-full w-full origin-left rounded-full bg-[#00d2ff]';
export const scaleX = (share: number) => ({ transform: `scaleX(${share})` });

export const panel = 'flex flex-col p-6 sm:p-9';
export const kicker = 'font-mono text-xs uppercase tracking-[0.02em] text-muted';
export const heading = 'mt-2 text-[1.75rem] font-normal leading-[1.15] tracking-[-0.02em] sm:text-[2.125rem]';
export const instructions = 'mt-3 max-w-[30rem] leading-relaxed text-muted';
export const buttons = 'mt-6 flex flex-wrap items-center gap-3';

export const result = 'mt-7 flex items-center gap-5 rounded-2xl bg-ground/60 p-4';
export const digit = (isConfident: boolean) =>
  `w-16 text-center text-[3.5rem] leading-none ${isConfident ? 'text-ink' : 'text-muted'}`;
export const resultText = 'min-w-0 flex-1 text-sm leading-relaxed';
export const resultLine = 'text-ink';
export const resultMeta = 'font-mono text-xs text-muted';
/** The model's 28x28 input, blown up with hard pixels. */
export const preview = 'size-[4.5rem] shrink-0 rounded-md bg-black [image-rendering:pixelated]';
export const waiting = 'mt-7 rounded-2xl border border-dashed border-ink/15 p-4 text-sm text-muted';
export const error = 'mt-4 text-sm text-[#a4442e]';
export const footnote = 'mt-auto pt-7 text-xs leading-relaxed text-muted';
export const more = `mt-4 self-start ${pillLinkEnd}`;

/** What the canvas paints with: bright ink over the camera, the site's ink on the drawing pad. */
export const INK = {
  camera: { color: '#3dff9a', width: 7 },
  draw: { color: '#172019', width: 10 },
  tipDraw: '#3dff9a',
  tipHover: '#00d2ff',
  tipRadius: 7,
} as const;
