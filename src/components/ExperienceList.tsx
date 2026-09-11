import { Fragment } from 'react';
import { awards, clubExperience, education, technicalSkills, workExperience } from '@/lib/data';

interface RowProps {
  heading: string;
  subheading: string;
  summary: string;
  when: string;
  children: React.ReactNode;
}

/** One line of the Experience list. Clicking it opens the details underneath. */
function Row({ heading, subheading, summary, when, children }: RowProps) {
  return (
    <li>
      <details className="group">
        <summary className="flex cursor-pointer list-none flex-col gap-2 rounded-2xl px-4 py-5 transition-colors hover:bg-ground/50 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 sm:px-6 [&::-webkit-details-marker]:hidden">
          {/* Only phrasing content is valid inside <summary>, so these are spans set to block. */}
          <span className="block max-w-[41.25rem]">
            <span className="block text-[1.0625rem]">
              {heading} <span className="text-muted">· {subheading}</span>
            </span>
            <span className="mt-1 block text-[0.9375rem] leading-relaxed text-muted">{summary}</span>
          </span>
          <span className="flex shrink-0 items-center gap-3 font-mono text-xs uppercase text-muted">
            {when}
            <span aria-hidden className="text-base leading-none transition-transform group-open:rotate-45">
              +
            </span>
          </span>
        </summary>
        <div className="px-4 pb-6 text-[0.9375rem] leading-relaxed text-muted sm:px-6">{children}</div>
      </details>
    </li>
  );
}

export default function ExperienceList() {
  const roles = [...workExperience, ...clubExperience];

  return (
    <>
      <ul className="divide-y divide-ink/10 rounded-[1.625rem] bg-shell p-2 sm:p-3">
        {roles.map((role) => (
          <Row
            key={role.company}
            heading={role.company}
            subheading={role.title}
            summary={role.summary}
            when={`${role.startDate} → ${role.endDate}`}
          >
            <ul className="max-w-[45rem] list-disc space-y-2 pl-5 marker:text-accent">
              {role.responsibilities.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </Row>
        ))}
        <Row
          heading={education.school}
          subheading={education.degree}
          summary={education.summary}
          when={education.graduation}
        >
          <p className="max-w-[45rem]">Coursework: {education.coursework.join(', ')}.</p>
        </Row>
      </ul>

      <dl className="mt-[1.125rem] grid gap-x-8 gap-y-3 rounded-[1.625rem] bg-shell px-6 py-7 text-[0.9375rem] leading-relaxed sm:grid-cols-[8rem_1fr] sm:px-9">
        {technicalSkills.map((group) => (
          <Fragment key={group.category}>
            <dt className="font-mono text-xs uppercase leading-6 text-muted">{group.category}</dt>
            <dd>{group.skills.join(', ')}</dd>
          </Fragment>
        ))}
        <dt className="font-mono text-xs uppercase leading-6 text-muted">Awards</dt>
        <dd>{awards.join(', ')}</dd>
      </dl>
    </>
  );
}
