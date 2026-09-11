import Link from 'next/link';
import * as styles from '@/styles/components/PageFooterNav';

interface PageFooterNavProps {
  back: { href: string; label: string };
  next: { href: string; label: string };
}

/** "Back" and "Next" at the bottom of a project or research page. */
export default function PageFooterNav({ back, next }: PageFooterNavProps) {
  return (
    <nav aria-label="More pages" className={styles.nav}>
      <Link href={back.href} className={styles.link}>
        <span aria-hidden>←</span> {back.label}
      </Link>
      <Link href={next.href} className={styles.link}>
        {next.label} <span aria-hidden>→</span>
      </Link>
    </nav>
  );
}
