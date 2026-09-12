import type { Metadata } from 'next';
import Image from 'next/image';
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
import { projects, type Project } from '@/lib/projects';
import { findBySlug, nextAfter } from '@/lib/slugs';
import * as styles from '@/styles/pages/project';

interface ProjectPageProps {
  params: { slug: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = findBySlug(projects, params.slug);
  if (!project) return {};

  // Relative, so it resolves against metadataBase. Without its own canonical this page
  // inherits the home page's and search engines treat it as a duplicate.
  // No openGraph block on purpose: declaring one here drops the root opengraph-image,
  // and og:title and og:description derive from the two fields above anyway.
  return {
    title: project.name,
    description: project.blurb,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

interface VideoFanProps {
  video: NonNullable<Project['video']>;
  name: string;
  screenSize: Project['screenSize'];
}

/** The demo video, with two screens fanned out behind it so it doesn't sit alone in the panel. */
function VideoFan({ video, name, screenSize }: VideoFanProps) {
  const [left, right] = video.flanks;
  return (
    <figure className={styles.videoFigure}>
      <div className={styles.videoStage}>
        <Image src={left} alt="" {...screenSize} sizes={styles.flankSizes} className={styles.leftFlank} />
        <Image src={right} alt="" {...screenSize} sizes={styles.flankSizes} className={styles.rightFlank} />
        <DemoVideo src={video.src} poster={video.poster} label={`${name} demo`} className={styles.video} />
      </div>
      <figcaption className={styles.videoCaption}>{video.note}</figcaption>
    </figure>
  );
}

/** A project with a demo video plays it up top; SwipeBite gets its swipe stack. */
function HeaderMedia({ project }: { project: Project }) {
  if (project.video) {
    return <VideoFan video={project.video} name={project.name} screenSize={project.screenSize} />;
  }
  // The large size fills the panel, which stretches to the height of the text beside it.
  return project.slug === 'swipebite' ? <SwipeStack fromTop={styles.HEADER_STACK_SCROLL} size="large" /> : null;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = findBySlug(projects, params.slug);
  if (!project) notFound();
  const next = nextAfter(projects, project.slug);

  return (
    <main>
      <PageShell>
        <div className={styles.header}>
          <div>
            <Link href="/#work" className={styles.backLink}>
              <span aria-hidden>←</span> All work
            </Link>
            <p className={styles.meta}>
              {project.number} <span aria-hidden>/</span> {project.period}
            </p>
            <h1 className={styles.title}>{project.name}</h1>
            <div className={styles.intro}>
              {project.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <dl className={styles.facts}>
              {project.facts.map((fact) => (
                <Fragment key={fact.label}>
                  <dt className={styles.factLabel}>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </Fragment>
              ))}
            </dl>
            <div className={styles.links}>
              {project.links.map((link) => (
                <a key={link.href} href={link.href} {...external} className={styles.linkButton}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className={styles.panel(project.tint)}>
            <HeaderMedia project={project} />
          </div>
        </div>
      </PageShell>

      <div className={styles.article}>
        <ArticleSection title="Screens" note={project.screensNote}>
          <ScreenTour screens={project.screens} size={project.screenSize} />
        </ArticleSection>

        <ArticleSection title="What it does">
          <dl className={styles.featureGrid}>
            {project.features.map((feature) => (
              <div key={feature.title} className={styles.feature}>
                <dt className={styles.featureTitle}>{feature.title}</dt>
                <dd className={styles.featureBody}>{feature.body}</dd>
              </div>
            ))}
          </dl>
        </ArticleSection>

        {project.build && (
          <ArticleSection title="How it's built">
            <dl className={styles.buildList}>
              {project.build.map((row) => (
                <div key={row.layer} className={styles.buildRow}>
                  <dt className={styles.buildLayer}>{row.layer}</dt>
                  <dd className={styles.buildDetail}>{row.detail}</dd>
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
