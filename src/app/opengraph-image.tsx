import { ImageResponse } from 'next/og';
import { personalInfo } from '@/lib/data';
import * as styles from '@/styles/pages/opengraphImage';

export const alt = `${personalInfo.name}, full stack developer`;
export const size = styles.size;
export const contentType = 'image/png';

/** The card people see when the site is shared anywhere. Rendered once at build time. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={styles.canvas}>
        <div style={styles.card}>
          <p style={styles.domain}>manniehernandez.com</p>
          <div style={styles.body}>
            <p style={styles.name}>{personalInfo.name}</p>
            <div style={styles.rule} />
            <p style={styles.role}>
              UCLA Computer Science and Linguistics. I build full stack and mobile products that people actually use.
            </p>
          </div>
          <div style={styles.footer}>Projects, research, and the longer version</div>
        </div>
      </div>
    ),
    size,
  );
}
