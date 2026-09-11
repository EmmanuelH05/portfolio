import Link from 'next/link';

interface PageFooterNavProps {
  back: { href: string; label: string };
  next: { href: string; label: string };
}

/** "Back" and "Next" at the bottom of a project or research page. */
export default function PageFooterNav({ back, next }: PageFooterNavProps) {
  return (
    <nav
      aria-label="More pages"
      className="mt-24 flex flex-wrap justify-between gap-4 border-t border-ink/10 px-2 pt-6 text-[0.9375rem] sm:px-10"
    >
      <Link href={back.href} className="transition-colors hover:text-accent">
        <span aria-hidden>←</span> {back.label}
      </Link>
      <Link href={next.href} className="transition-colors hover:text-accent">
        {next.label} <span aria-hidden>→</span>
      </Link>
    </nav>
  );
}
