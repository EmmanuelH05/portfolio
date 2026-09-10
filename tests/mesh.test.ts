import { describe, expect, test } from 'bun:test';
import { FRAMES, MESH, STEPS, signedArea, worstQuality } from '../src/lib/mesh';

describe('mesh relaxation', () => {
  test('starts visibly distorted and ends settled', () => {
    expect(worstQuality(FRAMES[0])).toBeLessThan(0.75);
    expect(worstQuality(FRAMES[STEPS])).toBeGreaterThan(0.99);
  });

  test('ends on the even lattice', () => {
    const drift = Math.max(
      ...FRAMES[STEPS].map(([x, y], i) => Math.hypot(x - MESH.rest[i][0], y - MESH.rest[i][1])),
    );
    expect(drift).toBeLessThan(0.5);
  });

  test('boundary points never move', () => {
    for (const frame of FRAMES) {
      frame.forEach(([x, y], i) => {
        if (!MESH.boundary[i]) return;
        expect(x).toBe(MESH.rest[i][0]);
        expect(y).toBe(MESH.rest[i][1]);
      });
    }
  });

  test('no triangle ever turns inside out', () => {
    const orientation = MESH.triangles.map(([a, b, c]) => Math.sign(signedArea(MESH.rest[a], MESH.rest[b], MESH.rest[c])));
    for (const frame of FRAMES) {
      MESH.triangles.forEach(([a, b, c], t) => {
        expect(Math.sign(signedArea(frame[a], frame[b], frame[c]))).toBe(orientation[t]);
      });
    }
  });

  test('every coordinate stays finite', () => {
    expect(FRAMES).toHaveLength(STEPS + 1);
    expect(FRAMES.flat(2).every(Number.isFinite)).toBe(true);
  });
});
