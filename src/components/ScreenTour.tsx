'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { Screen } from '@/lib/projects';
import * as styles from '@/styles/components/ScreenTour';

interface ScreenTourProps {
  screens: Screen[];
  size: { width: number; height: number };
}

const counter = (n: number) => String(n).padStart(2, '0');

/**
 * On wide screens the phone stays pinned while the captions scroll past, and whichever
 * caption crosses the middle of the viewport picks the screen. Narrow screens show each
 * screenshot inline under its caption.
 */
export default function ScreenTour({ screens, size }: ScreenTourProps) {
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.step));
        }
      },
      // A zero-height band across the middle of the viewport.
      { rootMargin: '-50% 0px -50% 0px' },
    );
    steps.current.forEach((step) => step && observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.layout}>
      <div className={styles.stickyColumn}>
        <div className={styles.sticky}>
          <div className={styles.stage} style={styles.stageRatio(size)}>
            {screens.map((screen, i) => (
              <Image
                key={screen.src}
                src={screen.src}
                alt={i === active ? screen.label : ''}
                fill
                sizes={styles.stickyShotSizes}
                className={styles.stickyShot(i === active)}
              />
            ))}
          </div>
          <p className={styles.counter}>
            {counter(active + 1)} / {counter(screens.length)} · {screens[active].label}
          </p>
        </div>
      </div>

      <ol>
        {screens.map((screen, i) => (
          <li
            key={screen.src}
            ref={(element) => {
              steps.current[i] = element;
            }}
            data-step={i}
            className={styles.step(i === active)}
          >
            <p className={styles.stepNumber(i === active)}>{counter(i + 1)}</p>
            <h3 className={styles.stepLabel}>{screen.label}</h3>
            <p className={styles.stepCaption}>{screen.caption}</p>
            <Image
              src={screen.src}
              alt={screen.label}
              width={size.width}
              height={size.height}
              sizes={styles.inlineShotSizes}
              className={styles.inlineShot}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}
