'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useTransform } from 'framer-motion';
import * as styles from '@/styles/components/motion/DriftPhoto';
import { useReducedMotionAfterMount, useScrollProgress } from './hooks';

interface DriftPhotoProps {
  src: string;
  alt: string;
  /** Anything laid over the photo, like the availability badge. */
  children?: React.ReactNode;
}

/** The hero photo. It sits slightly zoomed in and drifts inside its frame as it scrolls off the top. */
export default function DriftPhoto({ src, alt, children }: DriftPhotoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotionAfterMount();
  // 0 until the photo's top edge reaches the top of the screen, so the page loads at rest.
  const progress = useScrollProgress(ref, ['start start', 'end start']);
  const y = useTransform(progress, [0, 1], [styles.REST_Y, styles.DRIFT_Y]);

  return (
    <div className={styles.frame}>
      <div aria-hidden className={styles.dots} />
      <div ref={ref} className={styles.clip}>
        <motion.div className={styles.layer} style={styles.drift(reduceMotion ? styles.REST_Y : y)}>
          <Image src={src} alt={alt} fill priority sizes={styles.photoSizes} className={styles.photo} />
        </motion.div>
      </div>
      {children}
    </div>
  );
}
