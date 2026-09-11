import Link from 'next/link';
import { personalInfo, profileUrl } from '@/lib/data';
import { resumeHref } from '@/lib/site';
import { external } from './links';

const sectionLinks = [
  { href: '/#work', label: 'Work' },
  { href: '/#research', label: 'Research' },
  { href: '/#experience', label: 'Experience' },
];

const navLink = 'transition-colors hover:text-ink';

interface PageShellProps {
  /** On the home page the name is the h1; everywhere else it links home. */
  home?: boolean;
  children: React.ReactNode;
}

/** The rounded panel at the top of every page: name, nav, then the page's own header. */
export default function PageShell({ home = false, children }: PageShellProps) {
  const name = <span className="font-serif text-[1.625rem] leading-none tracking-[-0.01em]">{personalInfo.name}</span>;

  return (
    <div className="rounded-[1.75rem] bg-shell px-5 pb-10 pt-5 sm:px-10 sm:pb-14 sm:pt-[1.375rem]">
      <header className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        {home ? <h1>{name}</h1> : <Link href="/">{name}</Link>}
        <nav aria-label="Main">
          <ul className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted">
            {sectionLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={navLink}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={resumeHref} className={navLink}>
                Resume
              </a>
            </li>
            {/* On phones GitHub would wrap onto a line of its own; the footer links it too. */}
            <li className="hidden sm:block">
              <a href={profileUrl(personalInfo.github)} {...external} className={navLink}>
                GitHub
              </a>
            </li>
          </ul>
        </nav>
      </header>
      {children}
    </div>
  );
}
