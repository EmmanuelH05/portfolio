import type { Metadata } from 'next';
import ExperienceList from '@/components/ExperienceList';
import PageShell from '@/components/PageShell';
import * as styles from '@/styles/pages/sectionPage';

// No openGraph block: Next replaces that object instead of merging it, so a partial one here
// would drop the root's og:type, og:site_name and og:locale.
export const metadata: Metadata = {
  title: 'Experience',
  description: "Emmanuel Hernandez's work experience, UCLA coursework, and technical skills.",
  alternates: { canonical: '/experience' },
};

export default function Experience() {
  return (
    <main>
      <PageShell>
        <div className={styles.header}>
          <h1 className={styles.title}>Experience</h1>
        </div>
      </PageShell>
      <div className={styles.body}>
        <ExperienceList />
      </div>
    </main>
  );
}
