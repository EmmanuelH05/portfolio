import type { Tint } from '@/lib/projects';
import { tintClass } from '@/styles/tint';

export const panel = (tint: Tint) =>
  `mb-[1.125rem] grid items-center gap-8 overflow-clip rounded-[1.625rem] p-6 sm:p-11 md:grid-cols-2 md:gap-9 ${tintClass[tint]}`;

export const meta = 'mb-2.5 font-mono text-xs uppercase tracking-[0.02em] text-muted';
export const headline = 'mb-3 text-[1.625rem] leading-[1.15] tracking-[-0.01em] sm:text-[2rem]';
export const blurb = 'mb-5 leading-normal text-muted';
export const chipList = 'mb-6 flex flex-col items-start gap-2';
export const chip = 'flex items-center gap-2 rounded-full bg-white/60 py-[0.4375rem] pl-2 pr-3.5 text-sm';
export const check =
  'grid h-[1.125rem] w-[1.125rem] place-items-center rounded-full bg-accent text-[0.6875rem] font-medium text-white';
export const cta = 'border-b border-accent pb-0.5 text-[0.9375rem] transition-colors hover:border-ink';
