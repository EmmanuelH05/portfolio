/** No panel behind the nav and page header: they sit on the page, lined up with the cards below. */
export const shell = 'px-1 pb-8 pt-4 sm:pb-12 sm:pt-6';
export const header = 'flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between';
export const name = 'font-serif text-[1.625rem] leading-none tracking-[-0.01em]';
/** Smaller text and gaps on phones so all five links fit on one line at 375px. */
export const navList = 'flex flex-wrap gap-x-3 gap-y-1 text-[0.8125rem] sm:gap-x-7 sm:text-base md:text-[1.0625rem]';
export const navLink = 'transition-colors hover:text-accent';
/** Below lg, GitHub and LinkedIn would wrap the nav onto a second line; the footer links both. */
export const wideOnly = 'hidden lg:block';
