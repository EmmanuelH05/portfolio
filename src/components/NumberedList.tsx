import * as styles from '@/styles/components/NumberedList';

export default function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className={styles.list}>
      {items.map((item, index) => (
        <li key={item} className={styles.item}>
          <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}
