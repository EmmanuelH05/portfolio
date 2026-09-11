import type { MotionValue } from 'framer-motion';

export const rule = 'mx-auto mt-3.5 h-[0.09375rem] w-[7.5rem] bg-accent';
/** The rule at rest is fully drawn. */
export const DRAWN = 1;
export const draw = (scaleX: MotionValue<number> | number) => ({ scaleX });
