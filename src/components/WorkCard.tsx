import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/projects';
import * as styles from '@/styles/components/WorkCard';

/**
 * A project under "Selected work": one screen on its backdrop, the summary underneath. The
 * title's link stretches over the whole card, so a click anywhere on it opens the project.
 */
export default function WorkCard({ project }: { project: Project }) {
  const { backdrop, screen } = project.cover;

  return (
    <article className={styles.card}>
      <div className={styles.cover(project.tint)}>
        <Image src={backdrop} alt="" fill sizes={styles.backdropSizes} className={styles.backdrop} />
        <div className={styles.screenFrame(screen.kind)}>
          <Image
            src={screen.src}
            alt={screen.alt}
            width={screen.width}
            height={screen.height}
            sizes={styles.screenSizes(screen.kind)}
            className={styles.screen(screen.kind)}
          />
        </div>
      </div>
      <div className={styles.body}>
        <p className={styles.meta}>
          {project.number} <span aria-hidden>/</span> {project.period}
        </p>
        <h3 className={styles.headline}>
          <Link href={`/projects/${project.slug}`} className={styles.link}>
            {project.headline}
          </Link>
        </h3>
        <p className={styles.blurb}>{project.blurb}</p>
        <ul className={styles.chipList}>
          {project.chips.map((chip) => (
            <li key={chip} className={styles.chip}>
              {chip}
            </li>
          ))}
        </ul>
        {/* Looks like a button; the link over the whole card is what gets clicked. */}
        <span aria-hidden className={styles.button}>
          {project.cta} <span className={styles.arrow}>→</span>
        </span>
      </div>
    </article>
  );
}
