import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import WorkCard from '@/components/WorkCard';
import AirWriter from '@/components/airwriter/AirWriter';
import { personalInfo } from '@/lib/data';
import { projects } from '@/lib/projects';
import { resumeHref } from '@/lib/site';
import * as styles from '@/styles/pages/home';

// The title and description come from the root layout. No openGraph block: Next replaces
// that object wholesale instead of merging it, so declaring one here just to add og:url
// would drop the root's og:type, og:site_name and og:locale from the most shared page.
export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function Home() {
  return (
    <main>
      <PageShell home>
        <div className={styles.hero}>
          <h1 className={styles.greeting}>
            <span className={styles.greetingLine}>Hello!</span>{' '}
            <span className={styles.greetingLine}>I&apos;m Emmanuel Hernandez.</span>
          </h1>
          <div className={styles.intro}>
            <p className={styles.lead}>
              A first-generation college student studying Computer Science &amp; Linguistics @ UCLA.
            </p>
            <ul className={styles.affiliations}>
              <li>
                Building software for LA nonprofits <span className={styles.org}>@LA Blueprint</span>
              </li>
              <li>
                Built the volunteer dashboard <span className={styles.org}>@Rise the Fenua</span>
              </li>
              <li className={styles.availability}>
                <span aria-hidden className={styles.liveDot} />
                <span>
                  Open to summer 2027 internships and <span className={styles.nowrap}>co-ops</span>
                </span>
              </li>
            </ul>
          </div>
          <div className={styles.actions}>
            <a href={`mailto:${personalInfo.email}`} className={styles.connectButton}>
              Connect with me
            </a>
            <a href={resumeHref} className={styles.resumeButton}>
              Read my resume
            </a>
          </div>
        </div>
      </PageShell>

      <section id="work" aria-label="Selected work" className={styles.section}>
        <div className={styles.workGrid}>
          {projects.map((project) => (
            <WorkCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <AirWriter />
    </main>
  );
}
