import type { MotionValue } from 'framer-motion';

export const frame = 'relative mx-auto w-full max-w-[23.75rem] md:mr-0';
export const dots = 'dot-grid absolute -right-[1.125rem] -top-[1.125rem] h-[11.25rem] w-[7.5rem]';
/** Named `clip` rather than `window` so it does not shadow the global inside this module. */
export const clip = 'relative aspect-[4/5] overflow-clip rounded-[1.375rem]';
export const layer = 'absolute inset-0';
export const photo = 'object-cover object-[50%_40%]';
export const photoSizes = '(min-width: 1730px) 460px, (min-width: 768px) 380px, 90vw';

/** Zoomed in a little so there is room to drift inside the frame. */
const ZOOM = 1.12;
export const REST_Y = '-4%';
export const DRIFT_Y = '4%';
export const drift = (y: MotionValue<string> | string) => ({ scale: ZOOM, y });
