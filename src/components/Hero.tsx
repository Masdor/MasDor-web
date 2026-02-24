import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@/context/useNavigation'
import { Reveal } from '@/components/ui/Reveal'
import { ParticleField } from '@/components/ui/ParticleField'
import { Counter } from '@/components/ui/Counter'
import { useInView } from '@/hooks/useInView'
import shared from '@/styles/shared.module.css'
import styles from './Hero.module.css'

export function Hero() {
  const { scrollTo } = useNavigation()
  const { t } = useTranslation('hero')
  const [statsRef, statsVisible] = useInView(0.3)

  return (
    <section id="home" className={styles.hero}>
      <ParticleField />
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.glowGold} aria-hidden="true" />
      <div className={styles.glowGreen} aria-hidden="true" />

      <div className={styles.content}>
        <Reveal direction="left">
          <div className={styles.tagline}>
            <span className={styles.statusDot} />
            {t('tagline')}
          </div>
        </Reveal>

        <Reveal delay={0.08} direction="left">
          <h1 className={styles.title}>
            <span lang="en">{t('titleLine1')}</span><br />
            <span className={styles.titleAccent}>{t('titleLine2')}</span>
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className={styles.subtitle}>
            {t('subtitle')}
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className={styles.actions}>
            <button type="button" onClick={() => scrollTo('kontakt')} className={`${shared.btn} ${shared.btnPrimary}`}>{t('ctaPrimary')}</button>
            <button type="button" onClick={() => scrollTo('leistungen')} className={`${shared.btn} ${shared.btnOutline}`}>{t('ctaSecondary')}</button>
          </div>
        </Reveal>

        <Reveal delay={0.4} direction="none">
          <div ref={statsRef} className={styles.statsGrid}>
            {[
              { label: t('stats.domains'), static: '3' },
              { end: 100, suffix: '%', label: t('stats.documented') },
              { label: t('stats.response'), static: '<24h' },
              { label: t('stats.location'), static: 'DE' },
            ].map((s) => (
              <div key={s.label} className={styles.statCell}>
                <div className={styles.statValue}>
                  {s.static ?? <Counter end={s.end!} suffix={s.suffix ?? ''} trigger={statsVisible} />}
                </div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <div className={styles.scrollIndicator}>
        <span className={styles.scrollArrow}>
          <ChevronDown size={20} strokeWidth={2} />
        </span>
      </div>
    </section>
  )
}
