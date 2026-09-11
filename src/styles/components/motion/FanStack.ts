import { cubicBezier, type MotionValue } from 'framer-motion';

/** The screenshots' own pixel size. */
export const shotSize = { width: 1206, height: 2622 };
export const shotSizes = '184px';
export const stage = 'relative grid h-[18.75rem] place-items-center sm:h-[23.125rem]';
export const layer = 'absolute';
export const shot = 'h-[16.25rem] w-auto rounded-[1.375rem] shadow-shot sm:h-[20.625rem]';

// From the stack's top edge coming on screen to its middle reaching the middle of the screen.
export const RANGE = [0.12, 0.5];
// Fast at first, then easing into place, like cards sliding apart on a table.
export const EASE = { ease: cubicBezier(0.3, 0.7, 0.2, 1) };
// Offsets are a share of each screenshot's width, so the fan keeps its shape at every size.
export const STACKED = { leftX: '-6.5%', leftRotate: -2, rightX: '6.5%', rightRotate: 2, centerY: 0 };
export const FANNED = {
  left: { x: '-63%', rotate: -8 },
  right: { x: '63%', rotate: 8 },
  center: { y: -6 },
};

export const slide = (x: MotionValue<string>, rotate: MotionValue<number>) => ({ x, rotate });
export const lift = (y: MotionValue<number>) => ({ y });
