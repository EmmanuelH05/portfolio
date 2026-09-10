// The triangle mesh drawn on the remeshing pages, a small version of the research:
// boundary points stay fixed, every interior point is pulled toward its neighbors
// by springs and slowed by damping, and positions advance one semi-implicit Euler
// step per frame. Frames are precomputed so scrolling just picks one.

export type Point = readonly [number, number];
export type Triangle = readonly [number, number, number];

export interface Mesh {
  width: number;
  height: number;
  /** Where every point settles: an even triangular lattice. */
  rest: Point[];
  boundary: boolean[];
  edges: (readonly [number, number])[];
  triangles: Triangle[];
}

const ROWS = 6;
const COLS = 9;
const SPACING = 40;
const ROW_HEIGHT = (SPACING * Math.sqrt(3)) / 2;

// Starting distortion, as a share of the spacing: a smooth swirl plus seeded noise.
// Tuned so the worst triangle starts around 0.28 and nothing starts inside out.
const SWIRL = 0.55;
const NOISE = 0.2;
const SEED = 3;

// Tuned so the mesh is still visibly moving at step 100 and settled by step 140.
export const STEPS = 140;
const DT = 0.05;
const STIFFNESS = 1;
const DAMPING = 1.2;

const at = (row: number, col: number) => row * COLS + col;

function buildMesh(): Mesh {
  const rest: Point[] = [];
  const boundary: boolean[] = [];
  const edges: (readonly [number, number])[] = [];
  const triangles: Triangle[] = [];

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      rest.push([c * SPACING + (r % 2 ? SPACING / 2 : 0), r * ROW_HEIGHT]);
      boundary.push(r === 0 || r === ROWS - 1 || c === 0 || c === COLS - 1);
    }
  }

  for (let r = 0; r < ROWS; r++) {
    // Odd rows are offset half a spacing to the right, so the row below an odd
    // row starts further left: its neighbors under column c are c and c + 1.
    // Under an even row they are c - 1 and c.
    const shift = r % 2;
    for (let c = 0; c < COLS; c++) {
      if (c + 1 < COLS) edges.push([at(r, c), at(r, c + 1)]);
      if (r + 1 === ROWS) continue;

      const lowerLeft = c - 1 + shift;
      const lowerRight = c + shift;
      if (lowerLeft >= 0) edges.push([at(r, c), at(r + 1, lowerLeft)]);
      if (lowerRight < COLS) edges.push([at(r, c), at(r + 1, lowerRight)]);

      if (c + 1 < COLS) {
        triangles.push([at(r, c), at(r, c + 1), at(r + 1, c + shift)]);
        triangles.push([at(r + 1, c), at(r + 1, c + 1), at(r, c + 1 - shift)]);
      }
    }
  }

  return {
    width: (COLS - 1) * SPACING + SPACING / 2,
    height: (ROWS - 1) * ROW_HEIGHT,
    rest,
    boundary,
    edges,
    triangles,
  };
}

// Small seeded PRNG so the starting mesh is the same on the server and in the browser.
function mulberry32(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A smooth swirl plus a little noise: distorted, but no triangle starts inside out. */
function distort(mesh: Mesh): Point[] {
  const random = mulberry32(SEED);
  return mesh.rest.map(([x, y], i): Point => {
    if (mesh.boundary[i]) return [x, y];
    const u = x / mesh.width;
    const v = y / mesh.height;
    const swirlX = Math.sin(u * Math.PI * 2 + 1.3) * Math.cos(v * Math.PI);
    const swirlY = Math.cos(u * Math.PI * 1.5) * Math.sin(v * Math.PI * 2);
    const noiseX = random() * 2 - 1;
    const noiseY = random() * 2 - 1;
    return [
      x + SPACING * (SWIRL * swirlX + NOISE * noiseX),
      y + SPACING * (SWIRL * swirlY + NOISE * noiseY),
    ];
  });
}

function neighborsOf(mesh: Mesh): number[][] {
  const lists = mesh.rest.map((): number[] => []);
  for (const [a, b] of mesh.edges) {
    lists[a].push(b);
    lists[b].push(a);
  }
  return lists;
}

function simulate(mesh: Mesh): Point[][] {
  const neighbors = neighborsOf(mesh);
  const frames: Point[][] = [distort(mesh)];
  let velocity: Point[] = mesh.rest.map((): Point => [0, 0]);

  for (let step = 0; step < STEPS; step++) {
    const positions = frames[frames.length - 1];
    velocity = velocity.map(([vx, vy], i): Point => {
      if (mesh.boundary[i]) return [0, 0];
      const [px, py] = positions[i];
      let fx = -DAMPING * vx;
      let fy = -DAMPING * vy;
      for (const j of neighbors[i]) {
        fx += STIFFNESS * (positions[j][0] - px);
        fy += STIFFNESS * (positions[j][1] - py);
      }
      return [vx + fx * DT, vy + fy * DT];
    });
    frames.push(positions.map(([px, py], i): Point => [px + velocity[i][0] * DT, py + velocity[i][1] * DT]));
  }

  return frames;
}

export function signedArea(a: Point, b: Point, c: Point): number {
  return ((b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1])) / 2;
}

/** 1 for an equilateral triangle, approaching 0 as it collapses. */
export function triangleQuality(a: Point, b: Point, c: Point): number {
  const squared = (p: Point, q: Point) => (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2;
  const sum = squared(a, b) + squared(b, c) + squared(c, a);
  return sum === 0 ? 0 : (4 * Math.sqrt(3) * Math.abs(signedArea(a, b, c))) / sum;
}

export const MESH = buildMesh();

/** FRAMES[0] is the distorted start; FRAMES[STEPS] is (very nearly) settled. */
export const FRAMES = simulate(MESH);

export function worstQuality(points: Point[]): number {
  return Math.min(...MESH.triangles.map(([a, b, c]) => triangleQuality(points[a], points[b], points[c])));
}
