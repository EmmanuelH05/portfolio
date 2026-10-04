import type { ScreenKind } from '@/lib/projects';

/** The painted backdrop right under the nav, with the project's screen or demo video on it. */
export const hero = 'mt-8 sm:mt-10';
/** Phones and the video need the height. A window screenshot only needs the width, so on a phone it keeps a 4:3 shape. */
export const heroFrame = (isWindow: boolean) =>
  `relative isolate grid place-items-center overflow-clip rounded-[1.625rem] ${
    isWindow ? 'aspect-[4/3] sm:aspect-auto sm:h-[34rem]' : 'h-[28rem] sm:h-[34rem]'
  }`;
export const backdrop = 'object-cover';
/** The shell's inner width, capped by the 77.5rem page. */
export const backdropSizes = '(min-width: 1240px) 1120px, 100vw';
export const heroStage = 'relative grid w-full place-items-center px-6';
/** One straight screen: a phone at the same height as the demo videos, or a window across most of the width. */
export const heroScreen = (kind: ScreenKind) =>
  kind === 'phone'
    ? 'h-[23rem] w-auto rounded-[1.75rem] shadow-shot sm:h-[28rem]'
    : 'h-auto w-[78%] max-w-[44rem] rounded-xl shadow-shot sm:rounded-2xl';
/** A phone renders at most about 210px wide, a window 704px. */
export const heroScreenSizes = (kind: ScreenKind) => (kind === 'phone' ? '220px' : '(min-width: 1024px) 704px, 78vw');

/**
 * Intro on the left, facts on the right. The right column's top padding lines the facts up with the
 * meta line. No scroll margin: the section nav's Overview jump then lands the first line 40px down,
 * level with where every other section's title lands.
 */
export const header = 'grid gap-8 pt-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16';
export const aboutColumn = 'lg:pt-12';
export { pillLink as backLink } from '@/styles/buttons';
export const meta = 'mt-8 font-mono text-xs uppercase tracking-[0.02em] text-muted';
export const title = 'mt-2 font-serif text-[2.5rem] leading-[1.05] tracking-[-0.01em] sm:text-[2.75rem]';
export const intro = 'mt-4 max-w-[33.75rem] space-y-4 text-[1.0625rem] leading-relaxed text-muted sm:text-[1.1875rem]';
export const facts = 'grid max-w-[33.75rem] grid-cols-[5rem_1fr] gap-x-4 gap-y-2.5 text-[0.9375rem] leading-6';
export const factLabel = 'font-mono text-xs uppercase leading-6 text-muted';
export const links = 'mt-8 flex flex-wrap gap-3';
export { primaryButton as linkButton } from '@/styles/buttons';
/** A phone recording stands tall like the phone screens; a landscape one spans the width like a window. */
export const video = (kind: ScreenKind) =>
  kind === 'phone'
    ? 'relative aspect-[390/844] h-[23rem] w-auto rounded-[1.75rem] bg-ink object-cover shadow-shot sm:h-[28rem]'
    : 'relative aspect-video h-auto w-[78%] max-w-[44rem] rounded-xl bg-ink shadow-shot sm:rounded-2xl';
export const videoCaption = 'mx-auto mt-4 max-w-[36rem] text-center font-mono text-xs leading-relaxed text-muted';

/** The section nav down the left from lg up; below that the sections run full width. */
export const article = 'px-1 lg:grid lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-14';
export const sections = 'min-w-0';
export const featureGrid = 'grid gap-x-12 md:grid-cols-2';
export const feature = 'border-t border-ink/10 py-5';
export const featureTitle = 'text-[1.0625rem]';
export const featureBody = 'mt-1.5 leading-relaxed text-muted';
export const buildList = 'max-w-[53.75rem] divide-y divide-ink/10 border-y border-ink/10';
export const buildRow = 'grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6';
export const buildLayer = 'font-mono text-xs uppercase leading-7 text-muted';
export const buildDetail = 'leading-relaxed';

