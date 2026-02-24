import { Reveal } from '@/components/ui/Reveal'
import { TRUST_TAGS } from '@/data/trust-tags'
import styles from './TrustBar.module.css'

export function TrustBar() {
  return (
    <Reveal>
      <div className={styles.wrapper}>
        <div className={styles.bar} role="list" aria-label="Technische Standards und Kompetenzen">
          {TRUST_TAGS.map((t) => (
            <span key={t} className={styles.tag} role="listitem">{t}</span>
          ))}
        </div>
      </div>
    </Reveal>
  )
}
