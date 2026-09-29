import { pillLink } from '@/styles/buttons';

/** Wide screens only; on a phone the sections simply follow one another. */
export const aside = 'hidden lg:block';
/** mt matches the first section's top margin, so the list starts level with its title. */
export const nav = 'sticky top-10 mt-24';
export const heading = 'font-mono text-xs uppercase tracking-[0.02em] text-muted';
export const list = 'mt-4 space-y-1';
/** Each section is a pill; the one being read gets the soft background. */
export const link = (isActive: boolean) =>
  `block rounded-full px-4 py-1.5 text-[0.9375rem] leading-snug transition-colors ${
    isActive
      ? 'bg-white/70 text-ink shadow-[0_1px_2px_rgba(23,32,25,0.06)] ring-1 ring-inset ring-ink/10'
      : 'text-muted hover:bg-white/50 hover:text-ink'
  }`;
export const back = `mt-8 ${pillLink}`;
