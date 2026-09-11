import type { Mesh } from '@/lib/mesh';

const PAD = 6;

export const wrapper = 'w-full';
export const svg = 'h-auto w-full';
export const viewBox = (mesh: Mesh) => `${-PAD} ${-PAD} ${mesh.width + PAD * 2} ${mesh.height + PAD * 2}`;

export const triangle = 'fill-accent';
/** Clear once a triangle is close to equilateral, darker the worse its shape. */
export const shade = (quality: number) => Math.min(0.45, Math.max(0, (0.97 - quality) * 1.8)).toFixed(2);

export const edges = 'fill-none stroke-ink/40';
export const edgeWidth = 1;

export const point = (isBoundary: boolean) => (isBoundary ? 'fill-ink' : 'fill-accent');
export const pointRadius = (isBoundary: boolean) => (isBoundary ? 2 : 2.8);

export const readout = 'mt-4 text-center font-mono text-xs uppercase text-muted';
