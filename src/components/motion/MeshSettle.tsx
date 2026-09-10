'use client';

import { useRef, useState } from 'react';
import { useMotionValueEvent } from 'framer-motion';
import { FRAMES, MESH, STEPS, type Point, triangleQuality, worstQuality } from '@/lib/mesh';
import { useReducedMotionAfterMount, useScrollProgress } from './hooks';

const PAD = 6;
// The simulation moves fastest in its first steps. Easing in spreads that part over more of the scroll.
const SCROLL_CURVE = 1.6;

// Rounded so the server render and the browser agree to the character.
const xy = ([x, y]: Point) => `${x.toFixed(1)} ${y.toFixed(1)}`;

/** Clear once a triangle is close to equilateral, darker the worse its shape. */
const shade = (quality: number) => Math.min(0.45, Math.max(0, (0.97 - quality) * 1.8)).toFixed(2);

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
    <div ref={ref} className="w-full">
      <svg
        viewBox={`${-PAD} ${-PAD} ${MESH.width + PAD * 2} ${MESH.height + PAD * 2}`}
        className="h-auto w-full"
        role="img"
        aria-label="A triangle mesh relaxing from a distorted layout into even triangles"
      >
        {MESH.triangles.map(([a, b, c]) => (
          <path
            key={`${a}-${b}-${c}`}
            d={`M${xy(points[a])}L${xy(points[b])}L${xy(points[c])}Z`}
            className="fill-accent"
            fillOpacity={shade(triangleQuality(points[a], points[b], points[c]))}
          />
        ))}
        <path d={edges} className="fill-none stroke-ink/40" strokeWidth={1} />
        {points.map(([x, y], i) => (
          <circle
            key={i}
            cx={x.toFixed(1)}
            cy={y.toFixed(1)}
            r={MESH.boundary[i] ? 2 : 2.8}
            className={MESH.boundary[i] ? 'fill-ink' : 'fill-accent'}
          />
        ))}
      </svg>
      {readout && (
        <p className="mt-4 text-center font-mono text-xs uppercase text-muted">
          Step {String(shown).padStart(3, '0')} / {STEPS} · worst triangle {worstQuality(points).toFixed(2)}
        </p>
      )}
    </div>
  );
}
