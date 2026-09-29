import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import ResearchCard from '@/components/ResearchCard';
import { papers } from '@/lib/research';
import * as styles from '@/styles/pages/sectionPage';

// No openGraph block: Next replaces that object instead of merging it, so a partial one here
// would drop the root's og:type, og:site_name and og:locale.
export const metadata: Metadata = {
  title: 'Research',
  description: "Emmanuel Hernandez's research posters and papers.",
  alternates: { canonical: '/research' },
};

export default function Research() {
  return (
    <main>
      <PageShell>
        <div className={styles.header}>
          <h1 className={styles.title}>Research</h1>
        </div>
      </PageShell>
      <div className={styles.body}>
        <div className={styles.researchGrid}>
          {papers.map((paper) => (
            <ResearchCard key={paper.slug} paper={paper} />
          ))}
        </div>
      </div>
    </main>
  );
}
