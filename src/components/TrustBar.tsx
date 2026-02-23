import { Reveal } from '@/components/ui/Reveal'
import { TRUST_TAGS } from '@/data/trust-tags'
import styles from './TrustBar.module.css'

export function TrustBar() {
  return (
    <Reveal>
      <div className={styles.wrapper}>
        <div className={styles.bar}>
          {TRUST_TAGS.map((t) => (
            <span key={t} className={styles.tag}>{t}</span>
          ))}
        </div>
      </div>
    </Reveal>
  )
}
