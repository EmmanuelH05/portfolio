import Link from 'next/link';
import { personalInfo, profileUrl } from '@/lib/data';
import { resumeHref } from '@/lib/site';
import { external } from './links';
import * as styles from '@/styles/components/PageShell';

const sectionLinks = [
  { href: '/#work', label: 'Work' },
  { href: '/research', label: 'Research' },
  { href: '/experience', label: 'Experience' },
  { href: '/about', label: 'About' },
];

interface PageShellProps {
  /** On the home page the name is plain text, since the greeting is the h1; everywhere else it links home. */
  home?: boolean;
  children: React.ReactNode;
}

/** The rounded panel at the top of every page: name, nav, then the page's own header. */
export default function PageShell({ home = false, children }: PageShellProps) {
  const name = <span className={styles.name}>{personalInfo.name}</span>;

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        {home ? <p>{name}</p> : <Link href="/">{name}</Link>}
        <nav aria-label="Main">
          <ul className={styles.navList}>
            {sectionLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={resumeHref} className={styles.navLink}>
                Resume
              </a>
            </li>
            <li className={styles.wideOnly}>
              <a href={profileUrl(personalInfo.github)} {...external} className={styles.navLink}>
                GitHub
              </a>
            </li>
            <li className={styles.wideOnly}>
              <a href={profileUrl(personalInfo.linkedin)} {...external} className={styles.navLink}>
                LinkedIn
              </a>
            </li>
          </ul>
        </nav>
      </header>
      {children}
    </div>
  );
}
