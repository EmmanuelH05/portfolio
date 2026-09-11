'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { cubicBezier, motion, useTransform } from 'framer-motion';
import { useReducedMotionAfterMount, useScrollProgress } from './hooks';

const SHOT = { width: 1206, height: 2622 };
const shotClass = 'h-[16.25rem] w-auto rounded-[1.375rem] shadow-shot sm:h-[20.625rem]';
// From the stack's top edge coming on screen to its middle reaching the middle of the screen.
const RANGE = [0.12, 0.5];
// Fast at first, then easing into place, like cards sliding apart on a table.
const EASE = { ease: cubicBezier(0.3, 0.7, 0.2, 1) };
// Offsets are a share of each screenshot's width, so the fan keeps its shape at every size.
const FANNED = {
  left: { x: '-63%', rotate: -8 },
  right: { x: '63%', rotate: 8 },
  center: { y: -6 },
};

/** Three DIDUC screens fan out from a single stack as it scrolls into view. */
export default function FanStack() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotionAfterMount();
  const progress = useScrollProgress(ref, ['start end', 'end start']);
  const leftX = useTransform(progress, RANGE, ['-6.5%', FANNED.left.x], EASE);
  const leftRotate = useTransform(progress, RANGE, [-2, FANNED.left.rotate], EASE);
  const rightX = useTransform(progress, RANGE, ['6.5%', FANNED.right.x], EASE);
  const rightRotate = useTransform(progress, RANGE, [2, FANNED.right.rotate], EASE);
  const centerY = useTransform(progress, RANGE, [0, FANNED.center.y], EASE);

  return (
    <div ref={ref} className="relative grid h-[18.75rem] place-items-center sm:h-[23.125rem]">
      <motion.div className="absolute" style={reduceMotion ? FANNED.left : { x: leftX, rotate: leftRotate }}>
        <Image src="/diduc/event-detail.png" alt="DIDUC's event detail screen" {...SHOT} sizes="184px" className={shotClass} />
      </motion.div>
      <motion.div className="absolute" style={reduceMotion ? FANNED.right : { x: rightX, rotate: rightRotate }}>
        <Image src="/diduc/profile.png" alt="DIDUC's profile screen" {...SHOT} sizes="184px" className={shotClass} />
      </motion.div>
      <motion.div className="absolute" style={reduceMotion ? FANNED.center : { y: centerY }}>
        <Image src="/diduc/home.png" alt="DIDUC's events feed" {...SHOT} sizes="184px" className={shotClass} />
      </motion.div>
    </div>
  );
}
