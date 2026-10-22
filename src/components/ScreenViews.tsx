'use client';

import { useState } from 'react';
import ScreenTour from '@/components/ScreenTour';
import type { ScreenSet } from '@/lib/projects';
import * as styles from '@/styles/components/ScreenViews';

interface ScreenViewsProps {
  web: ScreenSet;
  mobile: ScreenSet;
}

const VIEWS = [
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
] as const;

type View = (typeof VIEWS)[number]['id'];

/** The same app at laptop and phone size, one tour at a time behind a Web / Mobile switch. */
export default function ScreenViews({ web, mobile }: ScreenViewsProps) {
  const [view, setView] = useState<View>('web');
  const set = view === 'web' ? web : mobile;

  return (
    <div className={styles.wrap}>
      <div role="group" aria-label="Screen size" className={styles.switcher}>
        {VIEWS.map((v) => (
          <button
            key={v.id}
            type="button"
            aria-pressed={view === v.id}
            onClick={() => setView(v.id)}
            className={styles.option(view === v.id)}
          >
            {v.label}
          </button>
        ))}
      </div>
      <p className={styles.note}>{set.note}</p>
      {/* A fresh tour per view, which starts it back at its first screen. */}
      <div className={styles.tour}>
        <ScreenTour key={view} screens={set.screens} size={set.size} />
      </div>
    </div>
  );
}
