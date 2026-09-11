import { Fragment } from 'react';
import { awards, clubExperience, education, technicalSkills, workExperience } from '@/lib/data';
import * as styles from '@/styles/components/ExperienceList';

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
      <details className={styles.row}>
        <summary className={styles.rowSummary}>
          {/* Only phrasing content is valid inside <summary>, so these are spans set to block. */}
          <span className={styles.rowHeadings}>
            <span className={styles.rowHeading}>
              {heading} <span className={styles.rowSubheading}>· {subheading}</span>
            </span>
            <span className={styles.rowNote}>{summary}</span>
          </span>
          <span className={styles.rowWhen}>
            {when}
            <span aria-hidden className={styles.rowMarker}>
              +
            </span>
          </span>
        </summary>
        <div className={styles.rowBody}>{children}</div>
      </details>
    </li>
  );
}

export default function ExperienceList() {
  const roles = [...workExperience, ...clubExperience];

  return (
    <>
      <ul className={styles.list}>
        {roles.map((role) => (
          <Row
            key={role.company}
            heading={role.company}
            subheading={role.title}
            summary={role.summary}
            when={`${role.startDate} → ${role.endDate}`}
          >
            <ul className={styles.bullets}>
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
          <p className={styles.coursework}>Coursework: {education.coursework.join(', ')}.</p>
        </Row>
      </ul>

      <dl className={styles.skills}>
        {technicalSkills.map((group) => (
          <Fragment key={group.category}>
            <dt className={styles.skillCategory}>{group.category}</dt>
            <dd>{group.skills.join(', ')}</dd>
          </Fragment>
        ))}
        <dt className={styles.skillCategory}>Awards</dt>
        <dd>{awards.join(', ')}</dd>
      </dl>
    </>
  );
}
