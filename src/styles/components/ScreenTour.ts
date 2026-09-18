export const layout = 'grid gap-10 lg:grid-cols-2 lg:gap-16';
export const stickyColumn = 'hidden lg:block';
export const sticky = 'sticky top-[10vh] flex flex-col items-center';
export const stage = 'relative max-w-full';
/**
 * The phone's shape comes from the screenshot's own dimensions, budgeted at up to 72vh (capped
 * at 40rem) tall. Width is `min()`'d against the column's own width too, so a landscape
 * screenshot shrinks to fit instead of blowing out the grid the way a height-only budget would.
 */
export const stageRatio = (size: { width: number; height: number }) => ({
  aspectRatio: `${size.width} / ${size.height}`,
  width: `min(100%, calc(min(72vh, 40rem) * ${size.width / size.height}))`,
  height: 'auto',
});
export const stickyShot = (isActive: boolean) =>
  `rounded-[1.875rem] object-cover shadow-shot transition-opacity duration-300 motion-reduce:transition-none ${
    isActive ? 'opacity-100' : 'opacity-0'
  }`;
/**
 * The widest the sticky frame ever actually renders is a landscape screenshot at the page's own
 * max column width (~590px); a portrait one stays well under that. 380px under-hinted landscape
 * screenshots, so the browser fetched a soft, too-small source and stretched it.
 */
export const stickyShotSizes = '600px';
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
/**
 * Only shown below lg, where a portrait screenshot renders about 212px wide at the 28.75rem
 * height cap. A landscape screenshot would blow past the viewport at that height, so width is
 * also capped to the column and height derives from whichever bound is tighter.
 */
export const inlineShot = 'mt-6 max-h-[28.75rem] max-w-full h-auto w-auto rounded-[1.625rem] shadow-shot lg:hidden';
/**
 * A landscape screenshot can render up to ~690px wide on a tablet-width screen just under the lg
 * breakpoint; a flat 212px (right only for portrait) under-hinted it into a blurry fetch. Below
 * that it's bounded by the viewport itself, hence the 100vw floor.
 */
export const inlineShotSizes = '(max-width: 1023px) min(700px, 100vw), 100vw';
