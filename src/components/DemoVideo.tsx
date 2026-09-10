'use client';

import { useEffect, useRef } from 'react';

interface DemoVideoProps {
  src: string;
  poster: string;
  label: string;
  className?: string;
}

/** Plays muted on a loop unless the visitor prefers reduced motion. The controls are always there. */
export default function DemoVideo({ src, poster, label, className }: DemoVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    video.muted = true;
    video.play().catch(() => {
      // Autoplay was refused (Low Power Mode, browser policy). The poster and controls still work.
    });
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      aria-label={label}
      muted
      loop
      playsInline
      controls
      preload="metadata"
      className={className}
    />
  );
}
