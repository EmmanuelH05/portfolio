/** Pulls the switch up under the section title, where the section's own note would sit. */
export const wrap = '-mt-6';
export const switcher = 'inline-flex rounded-full border border-ink/10 p-1';
export const option = (isActive: boolean) =>
  `rounded-full px-4 py-1.5 font-mono text-xs uppercase transition-colors ${
    isActive ? 'bg-accent text-white' : 'text-muted hover:text-ink'
  }`;
export const note = 'mt-4 max-w-[35rem] leading-relaxed text-muted';
export const tour = 'mt-8';
