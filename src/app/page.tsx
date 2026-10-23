import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import WorkCard from '@/components/WorkCard';
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

const featured = projects.filter((project) => !project.inProgress);
const inProgress = projects.filter((project) => project.inProgress);

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

      <section id="work" aria-labelledby="featured-work" className={styles.section}>
        <h2 id="featured-work" className={styles.sectionHeading}>
          Featured work
        </h2>
        <div className={styles.workGrid}>
          {featured.map((project) => (
            <WorkCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section id="now" aria-labelledby="currently-working-on" className={styles.section}>
        <h2 id="currently-working-on" className={styles.sectionHeading}>
          Currently working on
        </h2>
        <div className={styles.nowList}>
          {inProgress.map((project) => (
            <article key={project.slug} className={styles.nowItem}>
              <p className={styles.nowMeta}>
                In progress <span aria-hidden>/</span> {project.period}
              </p>
              <h3 className={styles.nowHeadline}>{project.headline}</h3>
              <p className={styles.nowBlurb}>{project.blurb}</p>
              <ul className={styles.nowChips}>
                {project.chips.map((chip) => (
                  <li key={chip} className={styles.nowChip}>
                    {chip}
                  </li>
                ))}
              </ul>
              <Link href={`/projects/${project.slug}`} className={styles.nowLink}>
                {project.cta} <span aria-hidden>→</span>
              </Link>
            </article>
          ))}
          {/* Always last: the next thing I build could be a team's. */}
          <article className={styles.nowItem}>
            <p className={styles.nowMeta}>
              Up next <span aria-hidden>/</span> Summer 2027
            </p>
            <h3 className={styles.nowHeadline}>Your feature</h3>
            <p className={styles.nowBlurb}>
              I&apos;m looking for a summer 2027 internship or co-op. If your team has a feature that needs
              building, I&apos;d love to hear about it.
            </p>
            <a href={`mailto:${personalInfo.email}`} className={styles.nowLink}>
              Contact me <span aria-hidden>→</span>
            </a>
          </article>
        </div>
      </section>
    </main>
  );
}
