export const layout = 'grid gap-10 lg:grid-cols-2 lg:gap-16';
export const stickyColumn = 'hidden lg:block';
export const sticky = 'sticky top-[10vh] flex flex-col items-center';
export const stage = 'relative h-[72vh] max-h-[40rem]';
/** The phone's shape comes from the screenshot's own dimensions. */
export const stageRatio = (size: { width: number; height: number }) => ({
  aspectRatio: `${size.width} / ${size.height}`,
});
export const stickyShot = (isActive: boolean) =>
  `rounded-[1.875rem] object-cover shadow-shot transition-opacity duration-300 motion-reduce:transition-none ${
    isActive ? 'opacity-100' : 'opacity-0'
  }`;
export const stickyShotSizes = '380px';
export const counter = 'mt-5 font-mono text-xs uppercase text-muted';

/**
 * Each caption sits at the top of its step, right under its line. The tall step on wide screens
 * is scroll room; its top edge crosses the middle of the screen as it activates, and at half a
 * screen tall the caption is still in view when the next step takes over.
 */
export const step = (isActive: boolean) =>
  `border-t pb-10 pt-6 lg:min-h-[50vh] ${isActive ? 'border-accent' : 'border-ink/10'}`;
export const stepNumber = (isActive: boolean) => `font-mono text-xs ${isActive ? 'text-accent' : 'text-muted'}`;
export const stepLabel = 'mt-2 text-xl';
export const stepCaption = 'mt-2 max-w-[27.5rem] leading-relaxed text-muted';
/** Only shown below lg, where it renders about 212px wide. */
export const inlineShot = 'mt-6 h-[28.75rem] w-auto rounded-[1.625rem] shadow-shot lg:hidden';
export const inlineShotSizes = '212px';
