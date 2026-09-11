import Image from 'next/image';
import Link from 'next/link';
import type { Paper } from '@/lib/research';
import MeshSettle from './motion/MeshSettle';
import { tintClass } from './tint';

/** A research card on the home page: the poster or the live mesh on top, the summary underneath. */
export default function ResearchCard({ paper }: { paper: Paper }) {
  const { figure } = paper;

  return (
    <article className="flex flex-col overflow-clip rounded-[1.625rem] bg-shell">
      <div className={`relative aspect-[16/10] ${tintClass[paper.tint]}`}>
        {figure.kind === 'poster' ? (
          <Image
            src={figure.image}
            alt={`The research poster for "${paper.title}"`}
            fill
            sizes="(min-width: 1730px) 720px, (min-width: 768px) 600px, 100vw"
            className="object-cover object-top"
          />
        ) : (
          <div className="grid h-full place-items-center px-8 sm:px-12">
            <MeshSettle />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="mb-2.5 font-mono text-xs uppercase tracking-[0.02em] text-muted">
          {paper.venue} <span aria-hidden>/</span> {paper.year}
        </p>
        <h3 className="font-serif text-[1.625rem] leading-[1.15]">{paper.title}</h3>
        <p className="mb-6 mt-3 leading-normal text-muted">{paper.summary}</p>
        <Link
          href={`/research/${paper.slug}`}
          className="mt-auto self-start border-b border-accent pb-0.5 text-[0.9375rem] transition-colors hover:border-ink"
        >
          Read more <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
