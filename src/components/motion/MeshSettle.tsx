'use client';

import { useRef, useState } from 'react';
import { useMotionValueEvent } from 'framer-motion';
import { FRAMES, MESH, STEPS, type Point, triangleQuality, worstQuality } from '@/lib/mesh';
import * as styles from '@/styles/components/motion/MeshSettle';
import { useReducedMotionAfterMount, useScrollProgress } from './hooks';

// The simulation moves fastest in its first steps. Easing in spreads that part over more of the scroll.
const SCROLL_CURVE = 1.6;

// Rounded so the server render and the browser agree to the character.
const xy = ([x, y]: Point) => `${x.toFixed(1)} ${y.toFixed(1)}`;

interface MeshSettleProps {
  /** Show the step counter and the worst triangle's score under the drawing. */
  readout?: boolean;
  /** Pixels of page scroll to settle over, for a drawing that is on screen at page load. */
  fromTop?: number;
}

/** The remeshing research, live: scrolling steps a spring simulation that relaxes a distorted mesh. */
export default function MeshSettle({ readout = false, fromTop }: MeshSettleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotionAfterMount();
  const [step, setStep] = useState(0);
  const progress = useScrollProgress(ref, ['start 95%', 'center 40%'], fromTop);
  useMotionValueEvent(progress, 'change', (value) => {
    setStep(Math.round(STEPS * value ** SCROLL_CURVE));
  });

  const shown = reduceMotion ? STEPS : step;
  const points = FRAMES[shown];
  const edges = MESH.edges.map(([a, b]) => `M${xy(points[a])}L${xy(points[b])}`).join('');

  return (
    <div ref={ref} className={styles.wrapper}>
      <svg
        viewBox={styles.viewBox(MESH)}
        className={styles.svg}
        role="img"
        aria-label="A triangle mesh relaxing from a distorted layout into even triangles"
      >
        {MESH.triangles.map(([a, b, c]) => (
          <path
            key={`${a}-${b}-${c}`}
            d={`M${xy(points[a])}L${xy(points[b])}L${xy(points[c])}Z`}
            className={styles.triangle}
            fillOpacity={styles.shade(triangleQuality(points[a], points[b], points[c]))}
          />
        ))}
        <path d={edges} className={styles.edges} strokeWidth={styles.edgeWidth} />
        {points.map(([x, y], i) => (
          <circle
            key={i}
            cx={x.toFixed(1)}
            cy={y.toFixed(1)}
            r={styles.pointRadius(MESH.boundary[i])}
            className={styles.point(MESH.boundary[i])}
          />
        ))}
      </svg>
      {readout && (
        <p className={styles.readout}>
          Step {String(shown).padStart(3, '0')} / {STEPS} · worst triangle {worstQuality(points).toFixed(2)}
        </p>
      )}
    </div>
  );
}
