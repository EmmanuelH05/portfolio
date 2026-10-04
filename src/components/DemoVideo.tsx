'use client';

import { useEffect, useRef } from 'react';

interface DemoVideoProps {
  src: string;
  poster: string;
  label: string;
  className?: string;
}

/** Plays on a loop like a GIF, with no controls. Visitors who prefer reduced motion get the poster as a still. */
export default function DemoVideo({ src, poster, label, className }: DemoVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    video.muted = true;
    video.play().catch(() => {
      // Autoplay was refused (Low Power Mode, browser policy). The poster stays up.
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
      disablePictureInPicture
      preload="metadata"
      className={className}
    />
  );
}
