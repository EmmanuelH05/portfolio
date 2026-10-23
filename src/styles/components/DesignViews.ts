import type { ScreenKind } from '@/lib/projects';

/** Phones three across (two on a phone), Mac frames two across (one on a phone). */
export const grid = (kind: ScreenKind) =>
  `mt-8 grid ${kind === 'phone' ? 'grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 sm:gap-x-8' : 'gap-x-6 gap-y-8 md:grid-cols-2'}`;
/** Both fidelities share one grid cell, stacked. */
export const stack = 'grid';
/** The hidden fidelity stays laid out, which lets it load with the visible one, but it's invisible to eyes and screen readers. */
export const frame = (kind: ScreenKind, isActive: boolean) =>
  `[grid-area:1/1] h-auto w-full shadow-shot ${
    kind === 'phone' ? 'rounded-[1.25rem] sm:rounded-[1.75rem]' : 'rounded-lg sm:rounded-xl'
  } ${isActive ? 'visible' : 'invisible'}`;
/** A phone frame renders at most about 280px wide, a Mac frame about 460px. */
export const frameSizes = (kind: ScreenKind) =>
  kind === 'phone' ? '(min-width: 640px) 280px, 50vw' : '(min-width: 768px) 460px, 100vw';
export const label = 'mt-3 font-mono text-xs uppercase leading-5 text-muted';
