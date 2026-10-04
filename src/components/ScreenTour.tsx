'use client';

import Image, { type ImageProps } from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { Screen } from '@/lib/projects';
import * as styles from '@/styles/components/ScreenTour';

interface ScreenTourProps {
  screens: Screen[];
  size: { width: number; height: number };
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

interface ScreenMediaProps {
  screen: Screen;
  alt: string;
  className: string;
  reducedMotion: boolean;
  /** Only the pinned phone passes this; a clip that isn't the active one holds still. */
  playing?: boolean;
  image: Omit<ImageProps, 'src' | 'alt' | 'className'>;
}

/** A still, or, for a screen with a clip, a muted loop that behaves like a GIF. */
function ScreenMedia({ screen, alt, className, reducedMotion, playing = true, image }: ScreenMediaProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const isVideo = Boolean(screen.video) && !reducedMotion;

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (playing) video.play().catch(() => {});
    else video.pause();
  }, [playing, isVideo]);

  if (!isVideo) return <Image src={screen.src} alt={alt} className={className} {...image} />;

  return (
    <video
      ref={ref}
      src={screen.video}
      poster={screen.src}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      className={image.fill ? `absolute inset-0 h-full w-full ${className}` : className}
    />
  );
}

const counter = (n: number) => String(n).padStart(2, '0');

/**
 * On wide screens the phone stays pinned while the captions scroll past, and whichever
 * caption crosses the middle of the viewport picks the screen. Narrow screens show each
 * screenshot inline under its caption.
 */
export default function ScreenTour({ screens, size }: ScreenTourProps) {
  const [active, setActive] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
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
              <ScreenMedia
                key={screen.src}
                screen={screen}
                alt={i === active ? screen.label : ''}
                className={styles.stickyShot(i === active, Boolean(screen.video))}
                reducedMotion={reducedMotion}
                playing={i === active}
                image={{ fill: true, sizes: styles.stickyShotSizes }}
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
            <ScreenMedia
              screen={screen}
              alt={screen.label}
              className={styles.inlineShot}
              reducedMotion={reducedMotion}
              image={{ width: size.width, height: size.height, sizes: styles.inlineShotSizes }}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}
