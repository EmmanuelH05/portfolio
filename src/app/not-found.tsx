import Link from 'next/link';
import PageShell from '@/components/PageShell';

export default function NotFound() {
  return (
    <main>
      <PageShell>
        <div className="max-w-[520px] py-16 sm:py-24">
          <p className="text-[19px] leading-[1.55] sm:text-[21px]">There&apos;s nothing at this address.</p>
          <Link href="/" className="mt-6 inline-block border-b border-accent pb-0.5 text-[15px]">
            Back to the home page <span aria-hidden>→</span>
          </Link>
        </div>
      </PageShell>
    </main>
  );
}
