'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useTransform } from 'framer-motion';
import { useReducedMotionAfterMount, useScrollProgress } from './hooks';

const REST_Y = '-4%';

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
  const y = useTransform(progress, [0, 1], [REST_Y, '4%']);

  return (
    <div className="relative mx-auto w-full max-w-[380px] md:mr-0">
      <div aria-hidden className="dot-grid absolute -right-[18px] -top-[18px] h-[180px] w-[120px]" />
      <div ref={ref} className="relative aspect-[4/5] overflow-clip rounded-[22px]">
        <motion.div className="absolute inset-0" style={{ scale: 1.12, y: reduceMotion ? REST_Y : y }}>
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="(min-width: 768px) 380px, 90vw"
            className="object-cover object-[50%_40%]"
          />
        </motion.div>
      </div>
      {children}
    </div>
  );
}
