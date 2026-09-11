import * as styles from '@/styles/components/ArticleSection';

interface ArticleSectionProps {
  title: string;
  note?: string;
  children: React.ReactNode;
}

/** A left-aligned section on the project and research pages. */
export default function ArticleSection({ title, note, children }: ArticleSectionProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      {note && <p className={styles.note}>{note}</p>}
      <div className={styles.body}>{children}</div>
    </section>
  );
}
