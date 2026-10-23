'use client';

import Image from 'next/image';
import { useState } from 'react';
import ViewSwitch from '@/components/ViewSwitch';
import type { Design } from '@/lib/projects';
import * as styles from '@/styles/components/DesignViews';

const FIDELITIES = [
  { id: 'lofi', label: 'Lo-fi' },
  { id: 'hifi', label: 'Hi-fi' },
] as const;

type Fidelity = (typeof FIDELITIES)[number]['id'];

/**
 * Figma frames in a grid, all lo-fi or all hi-fi. Both versions of a frame sit in the same cell
 * and the switch only changes which one is visible, so flipping it swaps every frame at once with
 * nothing left to load.
 */
export default function DesignViews({ design }: { design: Design }) {
  const [fidelity, setFidelity] = useState<Fidelity>('hifi');

  return (
    <div>
      <ViewSwitch label="Fidelity" views={FIDELITIES} value={fidelity} onChange={setFidelity} />
      <ul className={styles.grid(design.kind)}>
        {design.frames.map((frame) => (
          <li key={frame.label}>
            <div className={styles.stack}>
              {FIDELITIES.map(({ id, label }) => (
                <Image
                  key={id}
                  src={frame[id]}
                  alt={`${frame.label}, ${label}`}
                  width={design.size.width}
                  height={design.size.height}
                  sizes={styles.frameSizes(design.kind)}
                  className={styles.frame(design.kind, id === fidelity)}
                />
              ))}
            </div>
            {/* The image's alt already says the name, which is why screen readers skip this caption. */}
            <p aria-hidden className={styles.label}>
              {frame.label}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
