import { useTranslation } from 'react-i18next'
import { useNavigation } from '@/context/useNavigation'
import { Reveal } from '@/components/ui/Reveal'
import { ArrowRight } from 'lucide-react'
import shared from '@/styles/shared.module.css'
import styles from './CtaBanner.module.css'

export function CtaBanner() {
  const { scrollTo } = useNavigation()
  const { t } = useTranslation()

  return (
    <Reveal direction="none">
      <div className={styles.wrapper}>
        <div className={styles.banner}>
          <div className={styles.content}>
            <p className={styles.label}>{t('cta.label')}</p>
            <h2 className={styles.title}>{t('cta.title')}</h2>
            <p className={styles.subtitle}>
              {t('cta.subtitle')}
            </p>
          </div>
          <button
            type="button"
            onClick={() => scrollTo('kontakt')}
            className={`${shared.btn} ${shared.btnPrimary} ${styles.ctaBtn}`}
          >
            {t('cta.button')}
            <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </div>
    </Reveal>
  )
}
