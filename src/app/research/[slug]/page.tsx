import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleSection from '@/components/ArticleSection';
import NumberedList from '@/components/NumberedList';
import PageFooterNav from '@/components/PageFooterNav';
import PageShell from '@/components/PageShell';
import MeshSettle from '@/components/motion/MeshSettle';
import { papers, type Paper } from '@/lib/research';
import { fileKind, fileSize } from '@/lib/site';
import { findBySlug, nextAfter } from '@/lib/slugs';
import * as styles from '@/styles/pages/paper';

interface PaperPageProps {
  params: { slug: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return papers.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: PaperPageProps): Metadata {
  const paper = findBySlug(papers, params.slug);
  if (!paper) return {};

  // No openGraph block on purpose: declaring one drops the root opengraph-image, and
  // og:title and og:description derive from the two fields above anyway.
  return {
    title: paper.shortTitle,
    description: paper.summary,
    alternates: { canonical: `/research/${paper.slug}` },
  };
}

function PaperFigure({ paper }: { paper: Paper }) {
  const { figure } = paper;

  if (figure.kind === 'mesh') {
    return (
      <>
        <div className={styles.meshStage}>
          <MeshSettle readout fromTop={styles.MESH_SCROLL} />
        </div>
        <figcaption className={styles.caption}>
          Scroll to run it. Boundary points stay put, and every interior point is pulled toward its neighbors by
          springs and slowed by damping, one Euler step at a time. Shaded triangles are the badly shaped ones.
        </figcaption>
      </>
    );
  }

  return (
    <>
      <a href={figure.pdf} className={styles.posterLink}>
        <Image
          src={figure.image}
          alt={`The research poster for "${paper.title}"`}
          width={figure.width}
          height={figure.height}
          sizes={styles.posterSizes}
          className={styles.poster}
        />
      </a>
      <figcaption className={styles.caption}>
        The poster.{' '}
        <a href={figure.pdf} className={styles.inlineLink}>
          Open the full PDF
        </a>{' '}
        ({fileSize(figure.pdf)}).
      </figcaption>
    </>
  );
}

export default function PaperPage({ params }: PaperPageProps) {
  const paper = findBySlug(papers, params.slug);
  if (!paper) notFound();
  const next = nextAfter(papers, paper.slug);

  return (
    <main>
      <PageShell>
        <div className={styles.header}>
          <Link href="/#research" className={styles.backLink}>
            <span aria-hidden>←</span> Research
          </Link>
          <p className={styles.meta}>
            {paper.venue} <span aria-hidden>/</span> {paper.year}
          </p>
          <h1 className={styles.title}>{paper.title}</h1>
          <p className={styles.authors}>
            {paper.authors}. Mentored by {paper.mentor}, {paper.institution}.
          </p>
          <p className={styles.tools}>{paper.tools.join(' · ')}</p>
        </div>
      </PageShell>

      <figure className={styles.figure(paper.tint)}>
        <PaperFigure paper={paper} />
      </figure>

      <article className={styles.article}>
        <ArticleSection title="The problem">
          <p>{paper.problem}</p>
        </ArticleSection>

        <ArticleSection title="What we did">
          <p>{paper.approach}</p>
        </ArticleSection>

        <ArticleSection title="What we found">
          <NumberedList items={paper.findings} />
        </ArticleSection>

        <ArticleSection title="In more detail">
          <div className={styles.details}>
            {paper.details.map((detail) => (
              <div key={detail.label}>
                <h3 className={styles.detailLabel}>{detail.label}</h3>
                <p className={styles.detailBody}>{detail.body}</p>
              </div>
            ))}
          </div>
        </ArticleSection>

        <ArticleSection title="Files">
          <ul className={styles.fileList}>
            {paper.documents.map((doc) => (
              <li key={doc.href}>
                <a href={doc.href} className={styles.fileLink}>
                  <span>{doc.label}</span>
                  <span className={styles.fileMeta}>
                    {fileKind(doc.href)} · {fileSize(doc.href)}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </ArticleSection>
      </article>

      <PageFooterNav
        back={{ href: '/#research', label: 'Research' }}
        next={{ href: `/research/${next.slug}`, label: `Next: ${next.shortTitle}` }}
      />
    </main>
  );
}
