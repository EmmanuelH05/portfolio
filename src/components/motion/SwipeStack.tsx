'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useTransform } from 'framer-motion';
import * as styles from '@/styles/components/motion/SwipeStack';
import type { StackSize } from '@/styles/components/motion/SwipeStack';
import { useReducedMotionAfterMount, useScrollProgress } from './hooks';

const { SIZES, CROSSING_RANGE, STACKED, SWIPED } = styles;

interface SwipeStackProps {
  /** Pixels of page scroll to play over, for a stack that is on screen at page load. */
  fromTop?: number;
  size?: StackSize;
}

/** SwipeBite's top card swipes off to the right as you scroll, and the card under it straightens up. */
export default function SwipeStack({ fromTop, size = 'regular' }: SwipeStackProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotionAfterMount();
  const progress = useScrollProgress(ref, ['end end', 'start start'], fromTop);
  const range = fromTop === undefined ? CROSSING_RANGE : [0, 1];
  const topX = useTransform(progress, range, ['0%', SWIPED.top.x]);
  const topRotate = useTransform(progress, range, [STACKED.topRotate, SWIPED.top.rotate]);
  const nextRotate = useTransform(progress, range, [STACKED.nextRotate, SWIPED.next.rotate]);
  const nextScale = useTransform(progress, range, [STACKED.nextScale, SWIPED.next.scale]);
  const { card, hint } = SIZES[size];

  return (
    <div ref={ref} className={styles.stage(size)}>
      <motion.div className={styles.layer} style={reduceMotion ? SWIPED.next : styles.turn(nextRotate, nextScale)}>
        <Image
          src="/swipebite/feed.png"
          alt="SwipeBite's swipe feed showing Warehouse 72"
          {...styles.shotSize}
          sizes={hint}
          className={card}
        />
      </motion.div>
      <motion.div className={styles.layer} style={reduceMotion ? SWIPED.top : styles.slide(topX, topRotate)}>
        <Image
          src="/swipebite/feed2.png"
          alt="A SwipeBite restaurant card for Urban Plates"
          {...styles.shotSize}
          sizes={hint}
          className={card}
        />
      </motion.div>
    </div>
  );
}
