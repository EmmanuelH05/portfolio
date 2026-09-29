/**
 * The title, photo and buttons on the left, pinned while the story scrolls on the right. On a phone
 * they come first and the story follows.
 */
export const layout = 'grid gap-10 pt-12 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-16 md:pt-20';
export const aside = 'md:sticky md:top-10 md:self-start';
export { title } from '@/styles/pages/sectionPage';
export const photo = 'mt-8';
/** md:pt lines the story's first line up with the top of the photo. */
export const story = 'max-w-[38rem] space-y-6 text-[1.0625rem] leading-[1.75] text-ink/90 sm:text-[1.125rem] md:pt-[5.25rem]';
export const actions = 'mt-8 flex flex-wrap items-center gap-3';
export { connectButton, liveDot, nowrap, resumeButton } from '@/styles/buttons';
export const badge =
  'absolute bottom-4 left-4 right-4 flex items-center gap-2 rounded-[0.625rem] bg-shell/95 px-3.5 py-2.5 text-[0.8125rem] sm:right-auto';

/** "Off the clock": a dark panel under the story, holding the song and the concert clip. */
export const offTheClock = 'mt-16 rounded-[1.75rem] bg-[#10150F] px-6 py-14 text-shell sm:mt-24 sm:px-12 sm:py-20';
export const kicker = 'font-mono text-xs uppercase tracking-[0.02em] opacity-60';
export const sectionHeading = 'mt-3 text-[2.125rem] font-normal leading-[1.15] tracking-[-0.02em] sm:text-[2.75rem]';
export const sectionCopy = 'mt-4 max-w-[34rem] text-[1.0625rem] leading-relaxed opacity-80 sm:text-[1.1875rem]';
