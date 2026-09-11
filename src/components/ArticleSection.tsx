interface ArticleSectionProps {
  title: string;
  note?: string;
  children: React.ReactNode;
}

/** A left-aligned section on the project and research pages. */
export default function ArticleSection({ title, note, children }: ArticleSectionProps) {
  return (
    <section className="mt-20 sm:mt-24">
      <h2 className="font-serif text-[1.875rem] leading-tight tracking-[-0.01em] sm:text-[2.25rem]">{title}</h2>
      {note && <p className="mt-2 max-w-[35rem] leading-relaxed text-muted">{note}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}
