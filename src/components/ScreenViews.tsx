'use client';

import { useState } from 'react';
import ScreenTour from '@/components/ScreenTour';
import ViewSwitch from '@/components/ViewSwitch';
import type { ScreenSet } from '@/lib/projects';
import * as styles from '@/styles/components/ScreenViews';

export interface ScreenView {
  id: string;
  label: string;
  set: ScreenSet;
}

interface ScreenViewsProps {
  /** Names the switch for screen readers, like "Screen size". */
  label: string;
  views: ScreenView[];
  /** The view that shows first. */
  initial: string;
}

/** The same screens two ways (laptop and phone, or lo-fi and hi-fi), one tour at a time behind a switch. */
export default function ScreenViews({ label, views, initial }: ScreenViewsProps) {
  const [id, setId] = useState(initial);
  const set = (views.find((view) => view.id === id) ?? views[0]).set;

  return (
    <div className={styles.wrap}>
      <ViewSwitch label={label} views={views} value={id} onChange={setId} />
      <p className={styles.note}>{set.note}</p>
      {/* A fresh tour per view, which starts it back at its first screen. */}
      <div className={styles.tour}>
        <ScreenTour key={id} screens={set.screens} size={set.size} />
      </div>
    </div>
  );
}
