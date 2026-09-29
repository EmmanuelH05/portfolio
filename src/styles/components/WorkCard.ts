import type { ScreenKind, Tint } from '@/lib/projects';
import { tintClass } from '@/styles/tint';

export const card = 'group relative';

/**
 * The tint shows while the backdrop loads. The cover is a size container, so the screen on it is
 * sized in cqw and keeps its proportions at every card width.
 */
export const cover = (tint: Tint) =>
  `relative isolate aspect-[4/3] overflow-clip rounded-[1.625rem] [container-type:inline-size] sm:aspect-[3/2] ${tintClass[tint]}`;
export const backdrop =
  'object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]';
/** One column below md, two from md up, capped by the 77.5rem page. */
export const backdropSizes = '(min-width: 1240px) 590px, (min-width: 768px) 50vw, 100vw';
/**
 * One straight screen, whole and dead center in the cover. A phone gets a thin dark bezel and is
 * about 85% of the cover's height at both of its shapes (4:3 on phones, 3:2 from sm up); a window
 * screenshot spans 80% of the width. Sizes are in cqw, so the look is the same at every card width.
 */
export const screenFrame = (kind: ScreenKind) =>
  kind === 'phone'
    ? 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[5cqw] bg-ink p-[1cqw] shadow-shot'
    : 'absolute left-1/2 top-1/2 w-[80cqw] -translate-x-1/2 -translate-y-1/2';
export const screen = (kind: ScreenKind) =>
  kind === 'phone'
    ? 'block h-[62cqw] w-auto rounded-[4cqw] sm:h-[55cqw]'
    : 'block h-auto w-full rounded-[1.6cqw] shadow-shot';
/** A phone renders at most about 170px wide, a window about 470px. */
export const screenSizes = (kind: ScreenKind) =>
  kind === 'phone'
    ? '(min-width: 1240px) 180px, (min-width: 768px) 15vw, 30vw'
    : '(min-width: 1240px) 480px, (min-width: 768px) 40vw, 80vw';

export const body = 'px-1 pt-6';
export const meta = 'mb-2 font-mono text-xs uppercase tracking-[0.02em] text-muted';
export const headline = 'text-[1.375rem] leading-[1.25] tracking-[-0.005em] sm:text-[1.5rem]';
/** Stretched over the card. Its focus ring goes on the stretched part so it outlines the whole card. */
export const link =
  'after:absolute after:inset-0 after:z-10 after:rounded-[1.875rem] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-accent';
export const blurb = 'mt-2 max-w-[34rem] leading-normal text-muted';
export const chipList = 'mt-4 flex flex-wrap gap-2';
export const chip = 'rounded-full bg-shell px-3.5 py-1.5 text-sm text-muted';
/** Clear background at rest; the whole card's hover fills it. Its arrow sits in a forest circle. */
export const button =
  'mt-6 inline-flex items-center gap-3 rounded-full bg-transparent py-1.5 pl-5 pr-1.5 text-[0.9375rem] ring-1 ring-inset ring-ink/20 transition-colors duration-200 group-hover:bg-ink group-hover:text-shell group-hover:ring-ink';
export const arrow =
  'grid size-7 place-items-center rounded-full bg-forest text-sm text-shell transition duration-200 group-hover:bg-shell group-hover:text-ink motion-safe:group-hover:translate-x-0.5';
