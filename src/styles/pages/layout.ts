import { Fragment_Mono, Instrument_Sans, Instrument_Serif } from 'next/font/google';

const sans = Instrument_Sans({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', variable: '--font-serif', display: 'swap' });
const mono = Fragment_Mono({ subsets: ['latin'], weight: '400', variable: '--font-mono', display: 'swap' });

/** The three font custom properties the Tailwind families read. */
export const fontVariables = `${sans.variable} ${serif.variable} ${mono.variable}`;

export const container = 'mx-auto max-w-[77.5rem] px-3 pt-3 sm:px-[1.375rem] sm:pt-[1.375rem]';
