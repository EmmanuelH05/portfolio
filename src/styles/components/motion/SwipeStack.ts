import type { MotionValue } from 'framer-motion';

/** The screenshots' own pixel size. */
export const shotSize = { width: 390, height: 844 };
// Literal class names so Tailwind sees them. `large` fills the taller panel in a project page header.
export const SIZES = {
  regular: {
    stage: 'h-[18.75rem] sm:h-[23.125rem]',
    card: 'h-[16.25rem] w-auto rounded-[1.375rem] shadow-shot sm:h-[20.625rem]',
    // Cards render at most about 181px wide.
    hint: '184px',
  },
  large: {
    stage: 'h-[23rem] sm:h-[30rem]',
    card: 'h-[20rem] w-auto rounded-[1.75rem] shadow-shot sm:h-[26rem]',
    hint: '232px',
  },
};

export type StackSize = keyof typeof SIZES;

// w-full: the cards are absolutely positioned, so without it the stack collapses to zero width in a flex parent.
export const stage = (size: StackSize) => `relative grid w-full place-items-center ${SIZES[size].stage}`;
export const layer = 'absolute';

// While crossing the screen, the swipe plays out while the whole stack is visible.
export const CROSSING_RANGE = [0.05, 0.95];
export const STACKED = { topRotate: -2, nextRotate: 4, nextScale: 0.94 };
export const SWIPED = {
  top: { x: '38%', rotate: 8 },
  next: { rotate: 0, scale: 1 },
};

export const slide = (x: MotionValue<string>, rotate: MotionValue<number>) => ({ x, rotate });
export const turn = (rotate: MotionValue<number>, scale: MotionValue<number>) => ({ rotate, scale });
