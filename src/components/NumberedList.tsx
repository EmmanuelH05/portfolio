export default function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="max-w-[47.5rem] divide-y divide-ink/10 border-y border-ink/10">
      {items.map((item, index) => (
        <li key={item} className="grid grid-cols-[2.5rem_1fr] py-4 leading-relaxed">
          <span className="pt-[0.3125rem] font-mono text-xs text-muted">{String(index + 1).padStart(2, '0')}</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}
