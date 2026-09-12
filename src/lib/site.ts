// Build-time helpers that read public/. Server components only: this imports node:fs.
import fs from 'node:fs';
import path from 'node:path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const RESUME_FILE = '/resume.pdf';

/** Canonical origin. Metadata, the sitemap and robots.txt all resolve against it. */
export const siteUrl = 'https://manniehernandez.com';

/** "Read my resume" opens public/resume.pdf once it exists, otherwise it jumps to the Experience section. */
export const resumeHref = fs.existsSync(path.join(PUBLIC_DIR, RESUME_FILE)) ? RESUME_FILE : '/#experience';

/** Human-readable size of a file in public/, like "6.2 MB". Throws if the file is missing. */
export function fileSize(publicPath: string): string {
  const bytes = fs.statSync(path.join(PUBLIC_DIR, publicPath)).size;
  const megabyte = 1024 * 1024;
  if (bytes < megabyte) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / megabyte).toFixed(1)} MB`;
}

/** "PDF", "PPTX", ... from a file path. */
export function fileKind(publicPath: string): string {
  return path.extname(publicPath).slice(1).toUpperCase();
}
