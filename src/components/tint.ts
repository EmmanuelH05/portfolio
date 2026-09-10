import type { Tint } from '@/lib/projects';

// Literal class names so Tailwind sees them; the content files stay free of CSS.
export const tintClass: Record<Tint, string> = {
  sand: 'bg-sand',
  mist: 'bg-mist',
};
