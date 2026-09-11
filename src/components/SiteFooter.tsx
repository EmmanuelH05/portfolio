import { personalInfo, profileUrl } from '@/lib/data';
import { resumeHref } from '@/lib/site';
import { external } from './links';

export default function SiteFooter() {
  const links = [
    { label: 'GitHub', href: profileUrl(personalInfo.github), leavesSite: true },
    { label: 'LinkedIn', href: profileUrl(personalInfo.linkedin), leavesSite: true },
    { label: 'Resume', href: resumeHref, leavesSite: false },
  ];

  return (
    <footer id="contact" className="mt-20 scroll-mt-6">
      <div className="rounded-[1.75rem] bg-shell px-6 py-12 text-center sm:px-10 sm:py-16">
        <p className="mx-auto max-w-[33.75rem] text-[1.1875rem] leading-[1.55] sm:text-[1.3125rem]">
          Hiring for summer 2027, or want to talk about anything on here? Email is the fastest way to reach me.
        </p>
        <a
          href={`mailto:${personalInfo.email}`}
          className="mt-7 inline-block max-w-full rounded-full bg-forest px-6 py-3.5 text-[0.9375rem] text-shell transition-colors [overflow-wrap:anywhere] hover:bg-ink"
        >
          {personalInfo.email}
        </a>
      </div>
      <div className="flex flex-wrap justify-between gap-2.5 px-1 pb-10 pt-7 font-mono text-xs text-muted">
        <ul className="flex flex-wrap gap-x-4 gap-y-1">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                {...(link.leavesSite ? external : {})}
                className="text-ink underline decoration-accent underline-offset-[0.1875rem]"
              >
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
