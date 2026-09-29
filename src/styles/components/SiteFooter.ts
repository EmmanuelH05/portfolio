import { primaryButton } from '@/styles/buttons';

export const footer = 'mt-20 scroll-mt-6';
export const panel = 'rounded-[1.75rem] bg-shell px-6 py-12 text-center sm:px-10 sm:py-16';
/** max-w-full and the wrap rule keep the address inside a 320px screen at large browser font sizes. */
export const emailButton = `max-w-full [overflow-wrap:anywhere] ${primaryButton}`;
export const meta = 'flex flex-wrap justify-between gap-2.5 px-1 pb-10 pt-7 font-mono text-xs text-muted';
export const links = 'flex flex-wrap gap-2';
export { smallPill as link } from '@/styles/buttons';
