import type { Metadata } from 'next';
import { Fragment_Mono, Instrument_Sans, Instrument_Serif } from 'next/font/google';
import '@/styles/globals.css';
import SiteFooter from '@/components/SiteFooter';
import { personalInfo } from '@/lib/data';

const sans = Instrument_Sans({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', variable: '--font-serif', display: 'swap' });
const mono = Fragment_Mono({ subsets: ['latin'], weight: '400', variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  title: { default: personalInfo.name, template: `%s · ${personalInfo.name}` },
  description:
    'UCLA CS and Linguistics student building full-stack and mobile products with React Native, Next.js, Node, and Firebase.',
  keywords: ['Emmanuel Hernandez', 'Full-Stack Developer', 'UCLA', 'Computer Science', 'Portfolio'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        <div className="mx-auto max-w-[77.5rem] px-3 pt-3 sm:px-[1.375rem] sm:pt-[1.375rem]">
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
