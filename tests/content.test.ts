import { describe, expect, test } from 'bun:test';
import fs from 'node:fs';
import path from 'node:path';
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

describe('files referenced by the site exist in public/', () => {
  const PUBLIC_PATH = /^\/(images|swipebite|diduc|research)\/[\w.-]+$/;

  test('content data', () => {
    const referenced = stringsIn([projects, papers]).filter((value) => PUBLIC_PATH.test(value));
    expect(referenced.length).toBeGreaterThan(15);
    expect(referenced.filter((file) => !fs.existsSync(path.join(PUBLIC, file)))).toEqual([]);
  });

  test('components and pages', () => {
    const literals = sourceFiles.flatMap((file) =>
      [...fs.readFileSync(file, 'utf8').matchAll(/["'](\/(?:images|swipebite|diduc|research)\/[\w.-]+)["']/g)].map(
        (match) => match[1],
      ),
    );
    expect(literals.filter((file) => !fs.existsSync(path.join(PUBLIC, file)))).toEqual([]);
  });
});
