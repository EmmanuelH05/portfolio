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

// Each project's panel gets its own scroll motion.
const panelMedia: Record<string, React.ReactNode> = {
  swipebite: <SwipeStack />,
  diduc: <FanStack />,
};

export default function Home() {
  return (
    <main>
      <PageShell home>
        <div className="grid items-center gap-10 pt-10 md:grid-cols-[1.2fr_1fr] md:gap-14 md:pt-16">
          <div>
            <p className="mb-4 max-w-[32.5rem] text-[1.1875rem] leading-[1.55] sm:text-[1.3125rem]">
              I study Computer Science and Linguistics at UCLA. I was going to play soccer for a living until I tore
              my ACL in high school, picked up a laptop, and never really put it down.
            </p>
            <p className="mb-8 max-w-[32.5rem] leading-relaxed text-muted sm:text-[1.0625rem]">
              Right now I build the mobile app at{' '}
              <a href="#experience" className="text-link">
                We Explore Earth
              </a>
              , and I&apos;m making{' '}
              <Link href="/projects/swipebite" className="text-link">
                SwipeBite
              </Link>
              , a restaurant app that learns what you like one swipe at a time.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href={resumeHref}
                className="rounded-full bg-forest px-6 py-3.5 text-[0.9375rem] text-shell transition-colors hover:bg-ink"
              >
                Read my resume
              </a>
              <a href={`mailto:${personalInfo.email}`} className="border-b border-ink pb-0.5 text-[0.9375rem]">
                {personalInfo.email}
              </a>
            </div>
          </div>
          <DriftPhoto src="/images/profile-photo.jpg" alt="Emmanuel Hernandez at UCLA">
            <p className="absolute bottom-4 left-4 flex items-center gap-2 rounded-[0.625rem] bg-shell/95 px-3.5 py-2.5 text-[0.8125rem]">
              <span aria-hidden className="h-2 w-2 rounded-full bg-live" />
              Open to summer 2027 internships
            </p>
          </DriftPhoto>
        </div>
      </PageShell>

      <section id="work" className="scroll-mt-6">
        <SectionHeading>Selected work</SectionHeading>
        {projects.map((project) => (
          <ProjectPanel key={project.slug} project={project} media={panelMedia[project.slug]} />
        ))}
      </section>

      <section id="research" className="scroll-mt-6">
        <SectionHeading>Research</SectionHeading>
        <div className="grid gap-[1.125rem] md:grid-cols-2">
          {papers.map((paper) => (
            <ResearchCard key={paper.slug} paper={paper} />
          ))}
        </div>
      </section>

      <section id="experience" className="scroll-mt-6">
        <SectionHeading>Experience</SectionHeading>
        <ExperienceList />
      </section>

      <section id="about" className="scroll-mt-6">
        <SectionHeading>The longer version</SectionHeading>
        <div className="mx-auto max-w-[40rem] space-y-5 px-2 text-[1.0625rem] leading-[1.7] sm:text-[1.125rem]">
          {story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
    </main>
  );
}
