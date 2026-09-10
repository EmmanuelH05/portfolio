import type { Metadata } from 'next';
import { getImageProps } from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';
import ArticleSection from '@/components/ArticleSection';
import DemoVideo from '@/components/DemoVideo';
import NumberedList from '@/components/NumberedList';
import PageFooterNav from '@/components/PageFooterNav';
import PageShell from '@/components/PageShell';
import ScreenTour from '@/components/ScreenTour';
import SwipeStack from '@/components/motion/SwipeStack';
import { external } from '@/components/links';
import { tintClass } from '@/components/tint';
import { projects, type Project } from '@/lib/projects';
import { findBySlug, nextAfter } from '@/lib/slugs';

interface ProjectPageProps {
  params: { slug: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = findBySlug(projects, params.slug);
  return project ? { title: project.name, description: project.blurb } : {};
}

/** A project with a demo video plays it up top; SwipeBite gets its swipe stack. */
function HeaderMedia({ project }: { project: Project }) {
  if (project.video) {
    // Serve the poster frame through the image optimizer instead of the full-size PNG.
    const { props: poster } = getImageProps({ src: project.video.poster, alt: '', width: 390, height: 848 });
    return (
      <figure>
        <DemoVideo
          src={project.video.src}
          poster={poster.src}
          label={`${project.name} demo`}
          className="mx-auto aspect-[390/844] h-[440px] w-auto rounded-[28px] bg-ink/5 shadow-shot sm:h-[520px]"
        />
        <figcaption className="mx-auto mt-5 max-w-[360px] text-center font-mono text-xs leading-relaxed text-muted">
          {project.video.note}
        </figcaption>
      </figure>
    );
  }
  // In the header the stack is on screen at load, so it swipes over the first stretch of page scroll.
  return project.slug === 'swipebite' ? <SwipeStack fromTop={320} /> : null;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = findBySlug(projects, params.slug);
  if (!project) notFound();
  const next = nextAfter(projects, project.slug);

  return (
    <main>
      <PageShell>
        <div className="grid items-center gap-10 pt-10 md:pt-14 lg:grid-cols-2 lg:gap-14">
          <div>
            <Link href="/#work" className="font-mono text-xs text-muted transition-colors hover:text-ink">
              <span aria-hidden>←</span> All work
            </Link>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.02em] text-muted">
              {project.number} <span aria-hidden>/</span> {project.period}
            </p>
            <h1 className="mt-2 font-serif text-[40px] leading-[1.05] tracking-[-0.01em] sm:text-[44px]">
              {project.name}
            </h1>
            <div className="mt-4 max-w-[540px] space-y-4 text-[17px] leading-relaxed text-muted sm:text-[19px]">
              {project.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <dl className="mt-8 grid max-w-[540px] grid-cols-[5rem_1fr] gap-x-4 gap-y-2.5 text-[15px] leading-6">
              {project.facts.map((fact) => (
                <Fragment key={fact.label}>
                  <dt className="font-mono text-xs uppercase leading-6 text-muted">{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </Fragment>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  {...external}
                  className="rounded-full bg-forest px-5 py-3 text-[15px] text-shell transition-colors hover:bg-ink"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className={`rounded-[26px] p-6 sm:p-10 ${tintClass[project.tint]}`}>
            <HeaderMedia project={project} />
          </div>
        </div>
      </PageShell>

      <div className="px-2 sm:px-10">
        <ArticleSection title="Screens" note={project.screensNote}>
          <ScreenTour screens={project.screens} size={project.screenSize} />
        </ArticleSection>

        <ArticleSection title="What it does">
          <dl className="grid gap-x-12 md:grid-cols-2">
            {project.features.map((feature) => (
              <div key={feature.title} className="border-t border-ink/10 py-5">
                <dt className="text-[17px]">{feature.title}</dt>
                <dd className="mt-1.5 leading-relaxed text-muted">{feature.body}</dd>
              </div>
            ))}
          </dl>
        </ArticleSection>

        {project.build && (
          <ArticleSection title="How it's built">
            <dl className="max-w-[860px] divide-y divide-ink/10 border-y border-ink/10">
              {project.build.map((row) => (
                <div key={row.layer} className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <dt className="font-mono text-xs uppercase leading-7 text-muted">{row.layer}</dt>
                  <dd className="leading-relaxed">{row.detail}</dd>
                </div>
              ))}
            </dl>
          </ArticleSection>
        )}

        {project.roadmap && (
          <ArticleSection title="What I'm building next">
            <NumberedList items={project.roadmap} />
          </ArticleSection>
        )}

        {project.contributions && (
          <ArticleSection title="What I built">
            <NumberedList items={project.contributions} />
          </ArticleSection>
        )}
      </div>

      <PageFooterNav
        back={{ href: '/#work', label: 'All work' }}
        next={{ href: `/projects/${next.slug}`, label: `Next: ${next.name}` }}
      />
    </main>
  );
}
