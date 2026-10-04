'use client';

import { useRef, useState } from 'react';
import * as styles from '@/styles/components/ConcertClip';

interface Clip {
  src: string;
  poster: string;
}

interface ConcertClipProps {
  /** Cut from the middle of the 4K recording, so the close view is real pixels rather than a blow-up. */
  zoom: Clip;
  wide: Clip;
  label: string;
  children?: React.ReactNode;
}

export default function ConcertClip({ zoom, wide, label, children }: ConcertClipProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const resume = useRef<{ time: number; isPlaying: boolean } | null>(null);
  const [isZoomed, setIsZoomed] = useState(true);
  const clip = isZoomed ? zoom : wide;

  // The two views are separate files, so carry the position and playback across the switch.
  const swap = () => {
    const video = videoRef.current;
    resume.current = video ? { time: video.currentTime, isPlaying: !video.paused } : null;
    setIsZoomed(!isZoomed);
  };

  const onLoadedMetadata = () => {
    const video = videoRef.current;
    const state = resume.current;
    resume.current = null;
    if (!video || !state) return;
    video.currentTime = Number.isFinite(video.duration) ? Math.min(state.time, video.duration) : state.time;
    // Autoplay can be refused, and then the controls are right there.
    if (state.isPlaying) video.play().catch(() => {});
  };

  return (
    <figure className={styles.figure}>
      <div className={styles.frame}>
        <video
          key={clip.src}
          ref={videoRef}
          src={clip.src}
          poster={clip.poster}
          aria-label={label}
          controls
          playsInline
          preload="metadata"
          onLoadedMetadata={onLoadedMetadata}
          className={styles.stage}
        />
      </div>
      <div className={styles.controls}>
        <button type="button" onClick={swap} className={styles.button}>
          {isZoomed ? 'Show the whole stage' : 'Zoom in on me'}
        </button>
      </div>
      {children && <figcaption className={styles.caption}>{children}</figcaption>}
    </figure>
  );
}
