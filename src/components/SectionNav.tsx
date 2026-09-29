'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import * as styles from '@/styles/components/SectionNav';

export interface NavSection {
  id: string;
  label: string;
}

/** A section counts as the one being read once its top scrolls above this line, in px from the top. */
const READING_LINE = 120;

interface SectionNavProps {
  sections: NavSection[];
  back: { href: string; label: string };
}

/**
 * The list down the left of a project page. It stays in view while the sections scroll past and
 * marks the one being read: the last whose top has passed the reading line. A short section never
 * reaches the middle of the screen, so a mid-screen band would skip it.
 */
export default function SectionNav({ sections, back }: SectionNavProps) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const ids = sections.map((section) => section.id);
    let frame = 0;

    const update = () => {
      frame = 0;
      const passed = ids.filter(
        (id) => (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= READING_LINE,
      );
      // The last section can run out of page before its top reaches the line.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      setActive(atBottom ? ids[ids.length - 1] : passed[passed.length - 1] ?? ids[0]);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [sections]);

  return (
    <aside className={styles.aside}>
      <nav aria-label="On this page" className={styles.nav}>
        <p className={styles.heading}>On this page</p>
        <ol className={styles.list}>
          {sections.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} aria-current={id === active ? 'true' : undefined} className={styles.link(id === active)}>
                {label}
              </a>
            </li>
          ))}
        </ol>
        <Link href={back.href} className={styles.back}>
          <span aria-hidden>←</span> {back.label}
        </Link>
      </nav>
    </aside>
  );
}
