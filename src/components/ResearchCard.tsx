import Image from 'next/image';
import Link from 'next/link';
import type { Paper } from '@/lib/research';
import MeshSettle from './motion/MeshSettle';
import * as styles from '@/styles/components/ResearchCard';

/** A research card on the home page: the poster or the live mesh on top, the summary underneath. */
export default function ResearchCard({ paper }: { paper: Paper }) {
  const { figure } = paper;

  return (
    <article className={styles.card}>
      <div className={styles.figure(paper.tint)}>
        {figure.kind === 'poster' ? (
          <Image
            src={figure.image}
            alt={`The research poster for "${paper.title}"`}
            fill
            sizes={styles.posterSizes}
            className={styles.poster}
          />
        ) : (
          <div className={styles.meshStage}>
            <MeshSettle />
          </div>
        )}
      </div>
      <div className={styles.body}>
        <p className={styles.meta}>
          {paper.venue} <span aria-hidden>/</span> {paper.year}
        </p>
        <h3 className={styles.title}>{paper.title}</h3>
        <p className={styles.summary}>{paper.summary}</p>
        <Link href={`/research/${paper.slug}`} className={styles.cta}>
          Read more <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
