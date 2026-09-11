'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { Screen } from '@/lib/projects';

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
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="hidden lg:block">
        <div className="sticky top-[10vh] flex flex-col items-center">
          <div className="relative h-[72vh] max-h-[40rem]" style={{ aspectRatio: `${size.width} / ${size.height}` }}>
            {screens.map((screen, i) => (
              <Image
                key={screen.src}
                src={screen.src}
                alt={i === active ? screen.label : ''}
                fill
                sizes="380px"
                className={`rounded-[1.875rem] object-cover shadow-shot transition-opacity duration-300 motion-reduce:transition-none ${
                  i === active ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>
          <p className="mt-5 font-mono text-xs uppercase text-muted">
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
            // Each caption sits at the top of its step, right under its line. The tall step on wide
            // screens is scroll room; its top edge crosses the middle of the screen as it activates.
            className={`border-t pb-10 pt-6 lg:min-h-[55vh] ${i === active ? 'border-accent' : 'border-ink/10'}`}
          >
            <p className={`font-mono text-xs ${i === active ? 'text-accent' : 'text-muted'}`}>{counter(i + 1)}</p>
            <h3 className="mt-2 text-xl">{screen.label}</h3>
            <p className="mt-2 max-w-[27.5rem] leading-relaxed text-muted">{screen.caption}</p>
            <Image
              src={screen.src}
              alt={screen.label}
              width={size.width}
              height={size.height}
              sizes="280px"
              className="mt-6 h-[28.75rem] w-auto rounded-[1.625rem] shadow-shot lg:hidden"
            />
          </li>
        ))}
      </ol>
    </div>
  );
}
