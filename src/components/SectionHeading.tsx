import DrawRule from './motion/DrawRule';
import * as styles from '@/styles/components/SectionHeading';

/** The centered serif headings on the home page, with the rule that draws out underneath. */
export default function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>{children}</h2>
      <DrawRule />
    </div>
  );
}
