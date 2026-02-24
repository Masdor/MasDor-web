import { useTranslation } from 'react-i18next'
import { Reveal } from '@/components/ui/Reveal'
import { Icon } from '@/components/ui/Icon'
import { PROCESS_STEPS_META } from '@/data/process'
import shared from '@/styles/shared.module.css'
import styles from './Process.module.css'

export function Process() {
  const { t } = useTranslation('process')
  const items = t('items', { returnObjects: true }) as Array<{ title: string; desc: string }>

  return (
    <section id="methode" className={`${shared.section} ${shared.sectionDark}`}>
      <div className={shared.containerNarrow}>
        <Reveal>
          <div className={`${shared.sectionHeader} ${shared.sectionHeaderLg}`}>
            <span className={shared.tagBadge}>{t('sectionTag')}</span>
            <h2 className={shared.sectionTitle}>{t('sectionTitle')}</h2>
            <p className={`${shared.subtitle} ${shared.subtitleCentered}`}>{t('sectionSubtitle')}</p>
          </div>
        </Reveal>

        <div className={styles.grid}>
          {PROCESS_STEPS_META.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.08}>
              <div className={styles.step}>
                <div className={styles.stepNum} aria-hidden="true">{step.num}</div>
                <div className={styles.stepIcon}>
                  <Icon icon={step.icon} size={24} />
                </div>
                <div className={styles.stepLabel}><span className="sr-only">{t('stepLabel')} </span>{t('stepPrefix')} {step.num}</div>
                <h4 className={styles.stepTitle}>{items[i]!.title}</h4>
                <p className={styles.stepDesc}>{items[i]!.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
