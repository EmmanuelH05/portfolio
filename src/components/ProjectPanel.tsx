import Link from 'next/link';
import type { Project } from '@/lib/projects';
import { tintClass } from './tint';

interface ProjectPanelProps {
  project: Project;
  media: React.ReactNode;
}

/** A tinted panel under "Selected work" on the home page. */
export default function ProjectPanel({ project, media }: ProjectPanelProps) {
  return (
    <article
      className={`mb-[1.125rem] grid items-center gap-8 overflow-clip rounded-[1.625rem] p-6 sm:p-11 md:grid-cols-2 md:gap-9 ${tintClass[project.tint]}`}
    >
      <div>
        <p className="mb-2.5 font-mono text-xs uppercase tracking-[0.02em] text-muted">
          {project.number} <span aria-hidden>/</span> {project.period}
        </p>
        <h3 className="mb-3 text-[1.625rem] leading-[1.15] tracking-[-0.01em] sm:text-[2rem]">{project.headline}</h3>
        <p className="mb-5 leading-normal text-muted">{project.blurb}</p>
        <ul className="mb-6 flex flex-col items-start gap-2">
          {project.chips.map((chip) => (
            <li key={chip} className="flex items-center gap-2 rounded-full bg-white/60 py-[0.4375rem] pl-2 pr-3.5 text-sm">
              <span
                aria-hidden
                className="grid h-[1.125rem] w-[1.125rem] place-items-center rounded-full bg-accent text-[0.6875rem] font-medium text-white"
              >
                ✓
              </span>
              {chip}
            </li>
          ))}
        </ul>
        <Link
          href={`/projects/${project.slug}`}
          className="border-b border-accent pb-0.5 text-[0.9375rem] transition-colors hover:border-ink"
        >
          {project.cta} <span aria-hidden>→</span>
        </Link>
      </div>
      {media}
    </article>
  );
}
