import { personalInfo, profileUrl } from '@/lib/data';
import { resumeHref } from '@/lib/site';
import { external } from './links';
import * as styles from '@/styles/components/SiteFooter';

export default function SiteFooter() {
  const links = [
    { label: 'GitHub', href: profileUrl(personalInfo.github), leavesSite: true },
    { label: 'LinkedIn', href: profileUrl(personalInfo.linkedin), leavesSite: true },
    { label: 'Resume', href: resumeHref, leavesSite: false },
  ];

  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.panel}>
        <p className={styles.line}>
          Hiring for summer 2027, or want to talk about anything on here? Email is the fastest way to reach me.
        </p>
        <a href={`mailto:${personalInfo.email}`} className={styles.emailButton}>
          {personalInfo.email}
        </a>
      </div>
      <div className={styles.meta}>
        <ul className={styles.links}>
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} {...(link.leavesSite ? external : {})} className={styles.link}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <p>Los Angeles, CA</p>
      </div>
    </footer>
  );
}
