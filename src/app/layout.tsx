import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './../styles/globals.css';
import Navigation from '@/components/Navigation';
import { personalInfo } from '@/lib/data';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${personalInfo.name} - Portfolio`,
  description: 'Full-Stack Developer & Research Enthusiast | Computer Science and Linguistics at UCLA',
  keywords: ['Emmanuel Hernandez', 'Full-Stack Developer', 'UCLA', 'Computer Science', 'Portfolio'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={`${inter.className} ${playfair.variable}`}>
        <Navigation />
        <main>{children}</main>
        <footer className="bg-gray-900 text-white py-8 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
