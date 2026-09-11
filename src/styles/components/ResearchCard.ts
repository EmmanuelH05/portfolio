import type { Tint } from '@/lib/projects';
import { tintClass } from '@/styles/tint';

export const card = 'flex flex-col overflow-clip rounded-[1.625rem] bg-shell';
export const figure = (tint: Tint) => `relative aspect-[16/10] ${tintClass[tint]}`;
export const poster = 'object-cover object-top';
export const posterSizes = '(min-width: 1730px) 720px, (min-width: 768px) 600px, 100vw';
export const meshStage = 'grid h-full place-items-center px-8 sm:px-12';
export const body = 'flex flex-1 flex-col p-6 sm:p-8';
export const meta = 'mb-2.5 font-mono text-xs uppercase tracking-[0.02em] text-muted';
export const title = 'font-serif text-[1.625rem] leading-[1.15]';
export const summary = 'mb-6 mt-3 leading-normal text-muted';
export const cta = 'mt-auto self-start border-b border-accent pb-0.5 text-[0.9375rem] transition-colors hover:border-ink';
