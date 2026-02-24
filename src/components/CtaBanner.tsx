import { useNavigation } from '@/context/useNavigation'
import { Reveal } from '@/components/ui/Reveal'
import { ArrowRight } from 'lucide-react'
import shared from '@/styles/shared.module.css'
import styles from './CtaBanner.module.css'

export function CtaBanner() {
  const { scrollTo } = useNavigation()

  return (
    <Reveal direction="none">
      <div className={styles.wrapper}>
        <div className={styles.banner}>
          <div className={styles.content}>
            <p className={styles.label}>Bereit für strukturierte Technik?</p>
            <h2 className={styles.title}>Lassen Sie uns Ihr nächstes Projekt besprechen.</h2>
            <p className={styles.subtitle}>
              Ob Fehleranalyse, Systemoptimierung oder Neuaufbau — wir hören zu, analysieren und
              liefern.
            </p>
          </div>
          <button
            type="button"
            onClick={() => scrollTo('kontakt')}
            className={`${shared.btn} ${shared.btnPrimary} ${styles.ctaBtn}`}
          >
            Projekt anfragen
            <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </div>
    </Reveal>
  )
}
