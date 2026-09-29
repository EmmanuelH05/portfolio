import type { Metadata } from 'next';
import ConcertClip from '@/components/ConcertClip';
import PageShell from '@/components/PageShell';
import DriftPhoto from '@/components/motion/DriftPhoto';
import { personalInfo, story } from '@/lib/data';
import { resumeHref } from '@/lib/site';
import * as styles from '@/styles/pages/about';

// No openGraph block: Next replaces that object instead of merging it, so a partial one here
// would drop the root's og:type, og:site_name and og:locale.
export const metadata: Metadata = {
  title: 'About',
  description: 'How a torn ACL, a PC build tutorial and a lot of free time got Emmanuel Hernandez into computer science.',
  alternates: { canonical: '/about' },
};

export default function About() {
  return (
    <main>
      <PageShell>
        <div className={styles.layout}>
          <div className={styles.aside}>
            <h1 className={styles.title}>About me</h1>
            <div className={styles.photo}>
              <DriftPhoto src="/images/profile-photo.jpg" alt="Emmanuel Hernandez at UCLA">
                <p className={styles.badge}>
                  <span aria-hidden className={styles.liveDot} />
                  <span>
                    Open to summer 2027 internships and <span className={styles.nowrap}>co-ops</span>
                  </span>
                </p>
              </DriftPhoto>
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
          <div className={styles.story}>
            {story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <section aria-labelledby="off-the-clock" className={styles.offTheClock}>
          <p className={styles.kicker}>Off the clock</p>
          <h2 id="off-the-clock" className={styles.sectionHeading}>
            Outside of the workplace…
          </h2>
          <p className={styles.sectionCopy}>I play double bass, which is where the patience comes from.</p>
          <ConcertClip
            zoom={{ src: '/concert/zoom.mp4', poster: '/concert/zoom-poster.jpg' }}
            wide={{ src: '/concert/wide.mp4', poster: '/concert/wide-poster.jpg' }}
            label="The SCSBOA 2022 High School Wind Ensemble, with the camera on the double bass"
          >
            The SCSBOA 2022 High School Wind Ensemble playing El Zape and 3 Latin American Dances by Giovanni Santos. I am
            on double bass, standing at the back on the right.
          </ConcertClip>
        </section>
      </PageShell>
    </main>
  );
}
