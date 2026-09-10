interface ArticleSectionProps {
  title: string;
  note?: string;
  children: React.ReactNode;
}

/** A left-aligned section on the project and research pages. */
export default function ArticleSection({ title, note, children }: ArticleSectionProps) {
  return (
    <section className="mt-20 sm:mt-24">
      <h2 className="font-serif text-[30px] leading-tight tracking-[-0.01em] sm:text-[36px]">{title}</h2>
      {note && <p className="mt-2 max-w-[560px] leading-relaxed text-muted">{note}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}
