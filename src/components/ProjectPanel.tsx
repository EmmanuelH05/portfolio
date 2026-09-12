import Link from 'next/link';
import type { Project } from '@/lib/projects';
import * as styles from '@/styles/components/ProjectPanel';

interface ProjectPanelProps {
  project: Project;
  /** Optional: the projects with no screenshots of their own run as a single column. */
  media?: React.ReactNode;
}

/** A tinted panel under "Selected work" on the home page. */
export default function ProjectPanel({ project, media }: ProjectPanelProps) {
  return (
    <article className={styles.panel(project.tint, Boolean(media))}>
      <div>
        <p className={styles.meta}>
          {project.number} <span aria-hidden>/</span> {project.period}
        </p>
        <h3 className={styles.headline}>{project.headline}</h3>
        <p className={styles.blurb}>{project.blurb}</p>
        <ul className={styles.chipList}>
          {project.chips.map((chip) => (
            <li key={chip} className={styles.chip}>
              <span aria-hidden className={styles.check}>
                ✓
              </span>
              {chip}
            </li>
          ))}
        </ul>
        <Link href={`/projects/${project.slug}`} className={styles.cta}>
          {project.cta} <span aria-hidden>→</span>
        </Link>
      </div>
      {media}
    </article>
  );
}
