import type { Metadata } from 'next';
import '@/styles/globals.css';
import SiteFooter from '@/components/SiteFooter';
import { personalInfo } from '@/lib/data';
import { siteUrl } from '@/lib/site';
import * as styles from '@/styles/pages/layout';

const description =
  'UCLA CS and Linguistics student building full-stack and mobile products with React Native, Next.js, Node, and Firebase.';

export const metadata: Metadata = {
  // Without this, every og: and twitter: URL resolves relative and link previews break.
  metadataBase: new URL(siteUrl),
  title: { default: personalInfo.name, template: `%s · ${personalInfo.name}` },
  description,
  keywords: ['Emmanuel Hernandez', 'Full-Stack Developer', 'UCLA', 'Computer Science', 'Portfolio'],
  authors: [{ name: personalInfo.name, url: siteUrl }],
  creator: personalInfo.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: personalInfo.name,
    title: personalInfo.name,
    description,
  },
  twitter: { card: 'summary_large_image', title: personalInfo.name, description },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={styles.fontVariables}>
      <body>
        <div className={styles.container}>
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
