'use client';

import { type RefObject, useEffect, useState } from 'react';
import { type MotionValue, type UseScrollOptions, useReducedMotion, useScroll, useTransform } from 'framer-motion';

/**
 * How far a motion piece has played, from 0 to 1.
 *
 * By default it plays while the element crosses the screen (`offset`, as in framer's
 * useScroll). A piece that is already on screen when the page loads passes `fromTop`
 * instead and plays over that many pixels of page scroll. That way it starts at 0, the
 * same as the server render, and nothing jumps when the JavaScript arrives.
 */
export function useScrollProgress(
  target: RefObject<HTMLElement>,
  offset: UseScrollOptions['offset'],
  fromTop?: number,
): MotionValue<number> {
  const { scrollYProgress } = useScroll({ target, offset });
  const { scrollY } = useScroll();
  const pageProgress = useTransform(scrollY, [0, fromTop ?? 1], [0, 1]);
  return fromTop === undefined ? scrollYProgress : pageProgress;
}

/**
 * Whether to skip the motion and show the finished state.
 *
 * Stays false until hydration is done, so the first client render matches the server's
 * (which can't know the preference). Reduced-motion visitors then switch in a normal
 * update, which React writes to the page; a hydration mismatch would be left unpatched.
 */
export function useReducedMotionAfterMount(): boolean {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && prefersReduced === true;
}
