import type { Tint } from '@/lib/projects';
import { tintClass } from '@/styles/tint';

/**
 * Top-aligned: the text starts right under the nav and the panel stretches to match it.
 * The second column only exists when the project has media, otherwise the text runs full width
 * instead of sitting beside an empty box.
 */
export const header = (hasMedia: boolean) =>
  ['grid gap-10 pt-10 md:pt-14', hasMedia ? 'lg:grid-cols-2 lg:gap-14' : ''].filter(Boolean).join(' ');
export const backLink = 'font-mono text-xs text-muted transition-colors hover:text-ink';
export const meta = 'mt-8 font-mono text-xs uppercase tracking-[0.02em] text-muted';
export const title = 'mt-2 font-serif text-[2.5rem] leading-[1.05] tracking-[-0.01em] sm:text-[2.75rem]';
export const intro = 'mt-4 max-w-[33.75rem] space-y-4 text-[1.0625rem] leading-relaxed text-muted sm:text-[1.1875rem]';
export const facts = 'mt-8 grid max-w-[33.75rem] grid-cols-[5rem_1fr] gap-x-4 gap-y-2.5 text-[0.9375rem] leading-6';
export const factLabel = 'font-mono text-xs uppercase leading-6 text-muted';
export const links = 'mt-8 flex flex-wrap gap-3';
export const linkButton = 'rounded-full bg-forest px-5 py-3 text-[0.9375rem] text-shell transition-colors hover:bg-ink';
export const panel = (tint: Tint) =>
  `flex items-center justify-center overflow-clip rounded-[1.625rem] p-6 sm:p-10 ${tintClass[tint]}`;

export const videoFigure = 'w-full';
export const videoStage = 'relative grid h-[23rem] place-items-center sm:h-[26rem]';
export const video = 'relative aspect-[390/844] h-[23rem] w-auto rounded-[1.75rem] bg-ink shadow-shot sm:h-[26rem]';
/** The flanks render at most about 192px wide. */
export const flankSizes = '192px';
const flank = 'absolute h-[19rem] w-auto rounded-[1.5rem] shadow-shot sm:h-[22rem]';
export const leftFlank = `${flank} -translate-x-[58%] -rotate-[7deg]`;
export const rightFlank = `${flank} translate-x-[58%] rotate-[7deg]`;
export const videoCaption = 'mx-auto mt-6 max-w-[22.5rem] text-center font-mono text-xs leading-relaxed text-muted';

export const article = 'px-2 sm:px-10';
export const featureGrid = 'grid gap-x-12 md:grid-cols-2';
export const feature = 'border-t border-ink/10 py-5';
export const featureTitle = 'text-[1.0625rem]';
export const featureBody = 'mt-1.5 leading-relaxed text-muted';
export const buildList = 'max-w-[53.75rem] divide-y divide-ink/10 border-y border-ink/10';
export const buildRow = 'grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6';
export const buildLayer = 'font-mono text-xs uppercase leading-7 text-muted';
export const buildDetail = 'leading-relaxed';

/** In the header the stack is on screen at load, so it swipes over the first stretch of page scroll. */
export const HEADER_STACK_SCROLL = 320;
