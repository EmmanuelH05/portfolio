import localFont from 'next/font/local';

// Self-hosted latin files, the same ones Google Fonts serves. With next/font/google, Vercel's build gave
// the html tag different class names than the stylesheet, and the whole site fell back to Times.
const sans = localFont({
  src: '../fonts/instrument-sans-latin.woff2',
  weight: '400 700',
  variable: '--font-sans',
  display: 'swap',
});
const serif = localFont({
  src: '../fonts/instrument-serif-latin.woff2',
  weight: '400',
  variable: '--font-serif',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
});
const mono = localFont({ src: '../fonts/fragment-mono-latin.woff2', weight: '400', variable: '--font-mono', display: 'swap' });

/** The three font custom properties the Tailwind families read. */
export const fontVariables = `${sans.variable} ${serif.variable} ${mono.variable}`;

export const container = 'mx-auto max-w-[77.5rem] px-3 pt-3 sm:px-[1.375rem] sm:pt-[1.375rem]';
