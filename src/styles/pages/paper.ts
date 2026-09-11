import type { Tint } from '@/lib/projects';
import { tintClass } from '@/styles/tint';

export const header = 'max-w-[50rem] pt-10 md:pt-14';
export const backLink = 'font-mono text-xs text-muted transition-colors hover:text-ink';
export const meta = 'mt-8 font-mono text-xs uppercase tracking-[0.02em] text-muted';
export const title = 'mt-2 font-serif text-[2.125rem] leading-[1.1] tracking-[-0.01em] sm:text-[2.75rem]';
export const authors = 'mt-5 max-w-[38.75rem] text-[1.0625rem] leading-relaxed text-muted';
export const tools = 'mt-4 font-mono text-xs uppercase tracking-[0.02em] text-muted';

export const figure = (tint: Tint) => `mt-[1.125rem] rounded-[1.625rem] px-5 py-8 sm:px-10 sm:py-12 ${tintClass[tint]}`;
export const caption = 'mx-auto mt-5 max-w-[37.5rem] text-center text-[0.9375rem] leading-relaxed text-muted';
export const meshStage = 'mx-auto max-w-[47.5rem]';
/** The mesh is on screen at load, so it settles over the first stretch of page scroll. */
export const MESH_SCROLL = 420;
export const posterLink = 'block';
export const poster = 'mx-auto h-auto w-full max-w-[62.5rem] rounded-xl shadow-shot';
export const posterSizes = '(min-width: 1240px) 1200px, 100vw';
export const inlineLink = 'text-link';

export const article = 'mx-auto max-w-[45rem] px-2 text-[1.0625rem] leading-[1.7] sm:text-[1.125rem]';
export const details = 'space-y-8';
export const detailLabel = 'font-mono text-xs uppercase tracking-[0.02em] text-muted';
export const detailBody = 'mt-2';
export const fileList = 'divide-y divide-ink/10 border-y border-ink/10';
export const fileLink = 'flex items-baseline justify-between gap-4 py-4 transition-colors hover:text-accent';
export const fileMeta = 'font-mono text-xs uppercase text-muted';
