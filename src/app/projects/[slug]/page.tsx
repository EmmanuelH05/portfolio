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
import SectionNav, { type NavSection } from '@/components/SectionNav';
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
  // No openGraph block on purpose: Next replaces that object instead of merging it, so a
  // partial one here drops the root's og:type, og:site_name and og:locale, and in a nested
  // segment it drops the opengraph-image too. og:title and og:description derive from the
  // two fields above anyway.
  return {
    title: project.name,
    description: project.blurb,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

// Section titles, in page order. The nav down the left lists the ones a project has.
const TITLES = {
  overview: 'Overview',
  screens: 'Screens',
  features: 'What it does',
  build: "How it's built",
  roadmap: "What I'm building next",
  contributions: 'What I built',
} as const;

function sectionsFor(project: Project): NavSection[] {
  const has: Record<keyof typeof TITLES, boolean> = {
    overview: true,
    screens: true,
    features: true,
    build: Boolean(project.build),
    roadmap: Boolean(project.roadmap),
    contributions: Boolean(project.contributions),
  };
  return (Object.keys(TITLES) as (keyof typeof TITLES)[])
    .filter((id) => has[id])
    .map((id) => ({ id, label: TITLES[id] }));
}

/** What sits on the backdrop at the top of the page: the demo video if there is one, otherwise the cover screen. */
function heroMedia({ video, name, cover }: Project) {
  if (video) {
    const kind = video.kind ?? 'phone';
    return <DemoVideo src={video.src} poster={video.poster} label={`${name} demo`} className={styles.video(kind)} />;
  }
  const { screen } = cover;
  return (
    <Image
      src={screen.src}
      alt={screen.alt}
      width={screen.width}
      height={screen.height}
      sizes={styles.heroScreenSizes(screen.kind)}
      className={styles.heroScreen(screen.kind)}
    />
  );
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = findBySlug(projects, params.slug);
  if (!project) notFound();
  const next = nextAfter(projects, project.slug);
  const heroKind = project.video ? (project.video.kind ?? 'phone') : project.cover.screen.kind;
  const isWindowHero = heroKind === 'window';

  return (
    <main>
      <PageShell>
        <figure className={styles.hero}>
          <div className={styles.heroFrame(isWindowHero)}>
            <Image
              src={project.cover.backdrop}
              alt=""
              fill
              priority
              sizes={styles.backdropSizes}
              className={styles.backdrop}
            />
            <div className={styles.heroStage}>{heroMedia(project)}</div>
          </div>
          {project.video && <figcaption className={styles.videoCaption}>{project.video.note}</figcaption>}
        </figure>

        <div id="overview" className={styles.header}>
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
          </div>
          <div className={styles.aboutColumn}>
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
        </div>
      </PageShell>

      <div className={styles.article}>
        <SectionNav sections={sectionsFor(project)} back={{ href: '/#work', label: 'All work' }} />
        <div className={styles.sections}>
          <ArticleSection id="screens" title={TITLES.screens} note={project.screensNote}>
            <ScreenTour screens={project.screens} size={project.screenSize} />
          </ArticleSection>

          <ArticleSection id="features" title={TITLES.features}>
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
            <ArticleSection id="build" title={TITLES.build}>
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
            <ArticleSection id="roadmap" title={TITLES.roadmap}>
              <NumberedList items={project.roadmap} />
            </ArticleSection>
          )}

          {project.contributions && (
            <ArticleSection id="contributions" title={TITLES.contributions}>
              <NumberedList items={project.contributions} />
            </ArticleSection>
          )}
        </div>
      </div>

      <PageFooterNav
        back={{ href: '/#work', label: 'All work' }}
        next={{ href: `/projects/${next.slug}`, label: `Next: ${next.name}` }}
      />
    </main>
  );
}
