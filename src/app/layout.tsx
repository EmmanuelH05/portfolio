import type { Metadata } from 'next';
import '@/styles/globals.css';
import SiteFooter from '@/components/SiteFooter';
import { personalInfo } from '@/lib/data';
import * as styles from '@/styles/pages/layout';

export const metadata: Metadata = {
  title: { default: personalInfo.name, template: `%s · ${personalInfo.name}` },
  description:
    'UCLA CS and Linguistics student building full-stack and mobile products with React Native, Next.js, Node, and Firebase.',
  keywords: ['Emmanuel Hernandez', 'Full-Stack Developer', 'UCLA', 'Computer Science', 'Portfolio'],
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
