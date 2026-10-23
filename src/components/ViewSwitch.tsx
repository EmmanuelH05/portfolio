import * as styles from '@/styles/components/ViewSwitch';

interface ViewSwitchProps<T extends string> {
  /** Names the group for screen readers, like "Screen size". */
  label: string;
  views: readonly { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
}

/** A row of pill buttons that picks one view, like Web / Mobile or Lo-fi / Hi-fi. */
export default function ViewSwitch<T extends string>({ label, views, value, onChange }: ViewSwitchProps<T>) {
  return (
    <div role="group" aria-label={label} className={styles.switcher}>
      {views.map((view) => (
        <button
          key={view.id}
          type="button"
          aria-pressed={value === view.id}
          onClick={() => onChange(view.id)}
          className={styles.option(value === view.id)}
        >
          {view.label}
        </button>
      ))}
    </div>
  );
}
