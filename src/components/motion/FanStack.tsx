'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useTransform } from 'framer-motion';
import * as styles from '@/styles/components/motion/FanStack';
import { useReducedMotionAfterMount, useScrollProgress } from './hooks';

const { RANGE, EASE, STACKED, FANNED } = styles;

/** Three DIDUC screens fan out from a single stack as it scrolls into view. */
export default function FanStack() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotionAfterMount();
  const progress = useScrollProgress(ref, ['start end', 'end start']);
  const leftX = useTransform(progress, RANGE, [STACKED.leftX, FANNED.left.x], EASE);
  const leftRotate = useTransform(progress, RANGE, [STACKED.leftRotate, FANNED.left.rotate], EASE);
  const rightX = useTransform(progress, RANGE, [STACKED.rightX, FANNED.right.x], EASE);
  const rightRotate = useTransform(progress, RANGE, [STACKED.rightRotate, FANNED.right.rotate], EASE);
  const centerY = useTransform(progress, RANGE, [STACKED.centerY, FANNED.center.y], EASE);

  return (
    <div ref={ref} className={styles.stage}>
      <motion.div className={styles.layer} style={reduceMotion ? FANNED.left : styles.slide(leftX, leftRotate)}>
        <Image
          src="/diduc/event-detail.png"
          alt="DIDUC's event detail screen"
          {...styles.shotSize}
          sizes={styles.shotSizes}
          className={styles.shot}
        />
      </motion.div>
      <motion.div className={styles.layer} style={reduceMotion ? FANNED.right : styles.slide(rightX, rightRotate)}>
        <Image
          src="/diduc/profile.png"
          alt="DIDUC's profile screen"
          {...styles.shotSize}
          sizes={styles.shotSizes}
          className={styles.shot}
        />
      </motion.div>
      <motion.div className={styles.layer} style={reduceMotion ? FANNED.center : styles.lift(centerY)}>
        <Image
          src="/diduc/home.png"
          alt="DIDUC's events feed"
          {...styles.shotSize}
          sizes={styles.shotSizes}
          className={styles.shot}
        />
      </motion.div>
    </div>
  );
}
