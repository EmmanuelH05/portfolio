import Link from 'next/link';
import ExperienceList from '@/components/ExperienceList';
import PageShell from '@/components/PageShell';
import ProjectPanel from '@/components/ProjectPanel';
import ResearchCard from '@/components/ResearchCard';
import SectionHeading from '@/components/SectionHeading';
import DriftPhoto from '@/components/motion/DriftPhoto';
import FanStack from '@/components/motion/FanStack';
import SwipeStack from '@/components/motion/SwipeStack';
import { personalInfo, story } from '@/lib/data';
import { projects } from '@/lib/projects';
import { papers } from '@/lib/research';
import { resumeHref } from '@/lib/site';
import * as styles from '@/styles/pages/home';

// Each project's panel gets its own scroll motion.
const panelMedia: Record<string, React.ReactNode> = {
  swipebite: <SwipeStack />,
  diduc: <FanStack />,
};

export default function Home() {
  return (
    <main>
      <PageShell home>
        <div className={styles.hero}>
          <div>
            <p className={styles.lead}>
              I study Computer Science and Linguistics at UCLA. I was going to play soccer for a living until I tore
              my ACL in high school, picked up a laptop, and never really put it down.
            </p>
            <p className={styles.second}>
              Right now I build the mobile app at{' '}
              <a href="#experience" className={styles.inlineLink}>
                We Explore Earth
              </a>
              , and I&apos;m making{' '}
              <Link href="/projects/swipebite" className={styles.inlineLink}>
                SwipeBite
              </Link>
              , a restaurant app that learns what you like one swipe at a time.
            </p>
            <div className={styles.actions}>
              <a href={resumeHref} className={styles.resumeButton}>
                Read my resume
              </a>
              <a href={`mailto:${personalInfo.email}`} className={styles.emailLink}>
                {personalInfo.email}
              </a>
            </div>
          </div>
          <DriftPhoto src="/images/profile-photo.jpg" alt="Emmanuel Hernandez at UCLA">
            <p className={styles.badge}>
              <span aria-hidden className={styles.badgeDot} />
              Open to summer 2027 internships
            </p>
          </DriftPhoto>
        </div>
      </PageShell>

      <section id="work" className={styles.section}>
        <SectionHeading>Selected work</SectionHeading>
        {projects.map((project) => (
          <ProjectPanel key={project.slug} project={project} media={panelMedia[project.slug]} />
        ))}
      </section>

      <section id="research" className={styles.section}>
        <SectionHeading>Research</SectionHeading>
        <div className={styles.researchGrid}>
          {papers.map((paper) => (
            <ResearchCard key={paper.slug} paper={paper} />
          ))}
        </div>
      </section>

      <section id="experience" className={styles.section}>
        <SectionHeading>Experience</SectionHeading>
        <ExperienceList />
      </section>

      <section id="about" className={styles.section}>
        <SectionHeading>The longer version</SectionHeading>
        <div className={styles.story}>
          {story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
    </main>
  );
}
