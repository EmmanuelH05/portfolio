import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleSection from '@/components/ArticleSection';
import NumberedList from '@/components/NumberedList';
import PageFooterNav from '@/components/PageFooterNav';
import PageShell from '@/components/PageShell';
import MeshSettle from '@/components/motion/MeshSettle';
import { tintClass } from '@/components/tint';
import { papers, type Paper } from '@/lib/research';
import { fileKind, fileSize } from '@/lib/site';
import { findBySlug, nextAfter } from '@/lib/slugs';

interface PaperPageProps {
  params: { slug: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return papers.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: PaperPageProps): Metadata {
  const paper = findBySlug(papers, params.slug);
  return paper ? { title: paper.shortTitle, description: paper.summary } : {};
}

const captionClass = 'mx-auto mt-5 max-w-[600px] text-center text-[15px] leading-relaxed text-muted';

function PaperFigure({ paper }: { paper: Paper }) {
  const { figure } = paper;

  if (figure.kind === 'mesh') {
    return (
      <>
        <div className="mx-auto max-w-[760px]">
          {/* On screen at load, so it settles over the first stretch of page scroll. */}
          <MeshSettle readout fromTop={420} />
        </div>
        <figcaption className={captionClass}>
          Scroll to run it. Boundary points stay put, and every interior point is pulled toward its neighbors by
          springs and slowed by damping, one Euler step at a time. Shaded triangles are the badly shaped ones.
        </figcaption>
      </>
    );
  }

  return (
    <>
      <a href={figure.pdf} className="block">
        <Image
          src={figure.image}
          alt={`The research poster for "${paper.title}"`}
          width={figure.width}
          height={figure.height}
          sizes="(min-width: 1240px) 1000px, 100vw"
          className="mx-auto h-auto w-full max-w-[1000px] rounded-xl shadow-shot"
        />
      </a>
      <figcaption className={captionClass}>
        The poster.{' '}
        <a href={figure.pdf} className="text-link">
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
        <div className="max-w-[800px] pt-10 md:pt-14">
          <Link href="/#research" className="font-mono text-xs text-muted transition-colors hover:text-ink">
            <span aria-hidden>←</span> Research
          </Link>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.02em] text-muted">
            {paper.venue} <span aria-hidden>/</span> {paper.year}
          </p>
          <h1 className="mt-2 font-serif text-[34px] leading-[1.1] tracking-[-0.01em] sm:text-[44px]">{paper.title}</h1>
          <p className="mt-5 max-w-[620px] text-[17px] leading-relaxed text-muted">
            {paper.authors}. Mentored by {paper.mentor}, {paper.institution}.
          </p>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.02em] text-muted">{paper.tools.join(' · ')}</p>
        </div>
      </PageShell>

      <figure className={`mt-[18px] rounded-[26px] px-5 py-8 sm:px-10 sm:py-12 ${tintClass[paper.tint]}`}>
        <PaperFigure paper={paper} />
      </figure>

      <article className="mx-auto max-w-[720px] px-2 text-[17px] leading-[1.7] sm:text-[18px]">
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
          <div className="space-y-8">
            {paper.details.map((detail) => (
              <div key={detail.label}>
                <h3 className="font-mono text-xs uppercase tracking-[0.02em] text-muted">{detail.label}</h3>
                <p className="mt-2">{detail.body}</p>
              </div>
            ))}
          </div>
        </ArticleSection>

        <ArticleSection title="Files">
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {paper.documents.map((doc) => (
              <li key={doc.href}>
                <a
                  href={doc.href}
                  className="flex items-baseline justify-between gap-4 py-4 transition-colors hover:text-accent"
                >
                  <span>{doc.label}</span>
                  <span className="font-mono text-xs uppercase text-muted">
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
