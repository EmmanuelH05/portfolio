import Link from 'next/link';
import PageShell from '@/components/PageShell';
import * as styles from '@/styles/pages/notFound';

export default function NotFound() {
  return (
    <main>
      <PageShell>
        <div className={styles.wrapper}>
          <p className={styles.line}>There&apos;s nothing at this address.</p>
          <Link href="/" className={styles.link}>
            Back to the home page <span aria-hidden>→</span>
          </Link>
        </div>
      </PageShell>
    </main>
  );
}
