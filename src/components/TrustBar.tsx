import { Reveal } from '@/components/ui/Reveal'
import styles from './TrustBar.module.css'

const TRUST_TAGS = ['ISO 13485-nah', 'IEC 62353', 'MPBetreibV', 'Technische Compliance', 'GMP-orientiert', 'TIA Portal', 'Docker', 'Zabbix']

export function TrustBar() {
  return (
    <Reveal>
      <div className={styles.wrapper}>
        <div className={styles.bar}>
          {TRUST_TAGS.map((t, i) => (
            <span key={i} className={styles.tag}>{t}</span>
          ))}
        </div>
      </div>
    </Reveal>
  )
}
