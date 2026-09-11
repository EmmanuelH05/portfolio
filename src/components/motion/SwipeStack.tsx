'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useTransform } from 'framer-motion';
import { useReducedMotionAfterMount, useScrollProgress } from './hooks';

const SHOT = { width: 390, height: 844 };
// Literal class names so Tailwind sees them. `large` fills the taller panel in a project page header.
const SIZES = {
  regular: {
    stage: 'h-[18.75rem] sm:h-[23.125rem]',
    card: 'h-[16.25rem] w-auto rounded-[1.375rem] shadow-shot sm:h-[20.625rem]',
    // Cards render at most about 181px wide.
    hint: '184px',
  },
  large: {
    stage: 'h-[23rem] sm:h-[30rem]',
    card: 'h-[20rem] w-auto rounded-[1.75rem] shadow-shot sm:h-[26rem]',
    hint: '232px',
  },
};
// While crossing the screen, the swipe plays out while the whole stack is visible.
const CROSSING_RANGE = [0.05, 0.95];
const SWIPED = {
  top: { x: '38%', rotate: 8 },
  next: { rotate: 0, scale: 1 },
};

interface SwipeStackProps {
  /** Pixels of page scroll to play over, for a stack that is on screen at page load. */
  fromTop?: number;
  size?: keyof typeof SIZES;
}

/** SwipeBite's top card swipes off to the right as you scroll, and the card under it straightens up. */
export default function SwipeStack({ fromTop, size = 'regular' }: SwipeStackProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotionAfterMount();
  const progress = useScrollProgress(ref, ['end end', 'start start'], fromTop);
  const range = fromTop === undefined ? CROSSING_RANGE : [0, 1];
  const topX = useTransform(progress, range, ['0%', SWIPED.top.x]);
  const topRotate = useTransform(progress, range, [-2, SWIPED.top.rotate]);
  const nextRotate = useTransform(progress, range, [4, SWIPED.next.rotate]);
  const nextScale = useTransform(progress, range, [0.94, SWIPED.next.scale]);
  const { stage, card, hint } = SIZES[size];

  return (
    // w-full: the cards are absolutely positioned, so without it the stack collapses to zero width in a flex parent.
    <div ref={ref} className={`relative grid w-full place-items-center ${stage}`}>
      <motion.div className="absolute" style={reduceMotion ? SWIPED.next : { rotate: nextRotate, scale: nextScale }}>
        <Image
          src="/swipebite/feed.png"
          alt="SwipeBite's swipe feed showing Warehouse 72"
          {...SHOT}
          sizes={hint}
          className={card}
        />
      </motion.div>
      <motion.div className="absolute" style={reduceMotion ? SWIPED.top : { x: topX, rotate: topRotate }}>
        <Image
          src="/swipebite/feed2.png"
          alt="A SwipeBite restaurant card for Urban Plates"
          {...SHOT}
          sizes={hint}
          className={card}
        />
      </motion.div>
    </div>
  );
}
