import { describe, expect, test } from 'bun:test';
import { Glob } from 'bun';
import fs from 'node:fs';
import path from 'node:path';
import tailwind from '../tailwind.config.js';
import * as data from '../src/lib/data';
import { projects } from '../src/lib/projects';
import { papers } from '../src/lib/research';

const ROOT = path.join(import.meta.dir, '..');
const SRC = path.join(ROOT, 'src');
const PUBLIC = path.join(ROOT, 'public');

function filesUnder(dir: string): string[] {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => (entry.isDirectory() ? filesUnder(path.join(dir, entry.name)) : [path.join(dir, entry.name)]));
}

function stringsIn(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(stringsIn);
  if (value && typeof value === 'object') return Object.values(value).flatMap(stringsIn);
  return [];
}

const sourceFiles = filesUnder(SRC).filter((file) => /\.(tsx?|css)$/.test(file));

describe('copy', () => {
  test('no em dashes anywhere in src', () => {
    const offenders = sourceFiles.filter((file) => {
      const text = fs.readFileSync(file, 'utf8');
      return text.includes('—') || text.includes('&mdash;');
    });
    expect(offenders).toEqual([]);
  });

  test('the phone number is not part of the site data', () => {
    expect('phone' in data.personalInfo).toBe(false);
  });
});

describe('styling lives in src/styles, never in a tsx', () => {
  const componentFiles = sourceFiles.filter((file) => file.endsWith('.tsx'));

  // Catches className="x", className={`x`} and className={cond ? 'a' : 'b'}; allows className={styles.x}.
  const WRITTEN_CLASS = /className=(["'`]|\{[^}]*["'`])/;

  // A guard that quietly stops guarding is worse than none, so check the detector itself.
  test('the detector catches every shape of a class name written inline', () => {
    const styling = [`className="mt-4"`, 'className={`mt-4 ${x}`}', `className={isActive ? 'a' : 'b'}`];
    const notStyling = ['className={styles.card}', 'className={styles.step(i === active)}', 'className={card}'];

    expect(styling.filter((sample) => !WRITTEN_CLASS.test(sample))).toEqual([]);
    expect(notStyling.filter((sample) => WRITTEN_CLASS.test(sample))).toEqual([]);
  });

  test('no class names are written in a tsx', () => {
    const offenders = componentFiles.filter((file) => WRITTEN_CLASS.test(fs.readFileSync(file, 'utf8')));
    expect(offenders).toEqual([]);
  });

  // Allows style={styles.drift(y)} but not style={{ ... }} or style={cond ? a : { ... }}.
  test('no style objects are written in a tsx', () => {
    const offenders = componentFiles.filter((file) => /style=\{[^}]*\{/.test(fs.readFileSync(file, 'utf8')));
    expect(offenders).toEqual([]);
  });

  // A content glob that misses a folder drops its classes from the stylesheet with no error.
  test('tailwind scans every source file that can hold a class name', () => {
    const globs = tailwind.content.map((pattern: string) => new Glob(pattern));
    const scannable = filesUnder(SRC)
      .filter((file) => /\.(js|ts|jsx|tsx|mdx)$/.test(file))
      .map((file) => `./${path.relative(ROOT, file)}`);

    expect(scannable.length).toBeGreaterThan(30);
    expect(scannable.filter((file) => !globs.some((glob: Glob) => glob.match(file)))).toEqual([]);
  });
});

describe('files referenced by the site exist in public/', () => {
  const PUBLIC_PATH = /^\/(images|swipebite|diduc|research|crashfuzz|cswbench)\/[\w.-]+$/;

  test('content data', () => {
    const referenced = stringsIn([projects, papers]).filter((value) => PUBLIC_PATH.test(value));
    expect(referenced.length).toBeGreaterThan(15);
    expect(referenced.filter((file) => !fs.existsSync(path.join(PUBLIC, file)))).toEqual([]);
  });

  test('components and pages', () => {
    const literals = sourceFiles.flatMap((file) =>
      [
        ...fs
          .readFileSync(file, 'utf8')
          .matchAll(/["'](\/(?:images|swipebite|diduc|research|crashfuzz|cswbench)\/[\w.-]+)["']/g),
      ].map(
        (match) => match[1],
      ),
    );
    expect(literals.filter((file) => !fs.existsSync(path.join(PUBLIC, file)))).toEqual([]);
  });
});
