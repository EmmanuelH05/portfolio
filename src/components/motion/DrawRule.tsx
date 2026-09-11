'use client';

import { useRef } from 'react';
import { motion, useTransform } from 'framer-motion';
import { useReducedMotionAfterMount, useScrollProgress } from './hooks';

/** The short accent line under a section heading. It draws out from the center as it scrolls up the screen. */
export default function DrawRule() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotionAfterMount();
  const progress = useScrollProgress(ref, ['start end', 'start 55%']);
  const scaleX = useTransform(progress, [0.15, 1], [0, 1]);

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className="mx-auto mt-3.5 h-[0.09375rem] w-[7.5rem] bg-accent"
      style={{ scaleX: reduceMotion ? 1 : scaleX }}
    />
  );
}
