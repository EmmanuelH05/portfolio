/** Buttons and small pieces shared across pages. */

/** A soft hairline edge and shadow, so a light pill reads as a button on any background. */
const soft = 'bg-white/70 shadow-[0_1px_2px_rgba(23,32,25,0.06)] ring-1 ring-inset ring-ink/10 hover:bg-white';
/** Lifts a pixel on hover, unless the visitor prefers reduced motion. */
const lift = 'transition duration-200 motion-safe:hover:-translate-y-px';
/** The arrow span inside a pill link sits in a small forest circle. */
const arrowDot =
  '[&>span]:grid [&>span]:size-6 [&>span]:place-items-center [&>span]:rounded-full [&>span]:bg-forest [&>span]:text-xs [&>span]:text-shell';

/** The main call to action: filled forest green with a soft shadow. */
export const primaryButton = `inline-flex items-center rounded-full bg-forest px-6 py-3 text-[0.9375rem] text-shell shadow-[0_8px_20px_-8px_rgba(31,58,44,0.6)] hover:bg-ink ${lift}`;
export const connectButton = `inline-flex items-center rounded-full bg-forest px-6 py-3 text-base text-shell shadow-[0_8px_20px_-8px_rgba(31,58,44,0.6)] hover:bg-ink ${lift}`;
export const resumeButton = `inline-flex items-center rounded-full px-6 py-3 text-base ${soft} ${lift}`;

/** Every smaller link is a pill, never bare text. This one has its arrow first ("← All work"). */
export const pillLink = `inline-flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4 text-[0.9375rem] ${soft} ${arrowDot} ${lift}`;
/** The same pill with its arrow last ("Read more →"). */
export const pillLinkEnd = `inline-flex items-center gap-2.5 rounded-full py-1.5 pl-4 pr-1.5 text-[0.9375rem] ${soft} ${arrowDot} ${lift}`;
/** A pill for plain actions with no arrow (Clear, Stop camera). */
export const pillButton = `inline-flex items-center rounded-full px-4 py-2 text-[0.9375rem] ${soft} ${lift}`;
/** A smaller pill for the footer's row of links. */
export const smallPill = `inline-block rounded-full px-3 py-1.5 ${soft} ${lift}`;

/** The green "available" dot. */
export const liveDot = 'h-2 w-2 shrink-0 rounded-full bg-live';
/** Keeps "co-ops" from breaking at its hyphen. */
export const nowrap = 'whitespace-nowrap';
