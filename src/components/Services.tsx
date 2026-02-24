import { useState, useRef, useCallback } from 'react'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@/context/useNavigation'
import { Reveal } from '@/components/ui/Reveal'
import { HoverCard } from '@/components/ui/HoverCard'
import { Icon } from '@/components/ui/Icon'
import { SERVICES_META } from '@/data/services'
import shared from '@/styles/shared.module.css'
import styles from './Services.module.css'

export function Services() {
  const { scrollTo } = useNavigation()
  const { t } = useTranslation('services')
  const [activeService, setActiveService] = useState(0)
  const [panelVisible, setPanelVisible] = useState(true)
  const svc = SERVICES_META[activeService]!
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])

  const switchTab = useCallback((index: number) => {
    if (index === activeService) return
    setPanelVisible(false)
    const timeout = setTimeout(() => {
      setActiveService(index)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPanelVisible(true)
        })
      })
    }, 200)
    return () => clearTimeout(timeout)
  }, [activeService])

  const handleTabKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    let next: number | null = null
    if (e.key === 'ArrowRight') next = (index + 1) % SERVICES_META.length
    else if (e.key === 'ArrowLeft') next = (index - 1 + SERVICES_META.length) % SERVICES_META.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = SERVICES_META.length - 1

    if (next !== null) {
      e.preventDefault()
      switchTab(next)
      tabsRef.current[next]?.focus()
    }
  }, [switchTab])

  const items = t('items', { returnObjects: true }) as Array<{
    subtitle: string
    intro: string
    focus: Array<{ title: string; desc: string }>
    principles: string[]
    audience: string[]
    strengths: string[]
  }>
  const svcText = items[activeService]!

  return (
    <section id="leistungen" className={`${shared.section} ${shared.sectionDarker} ${shared.sectionWithDivider} ${styles.sectionDivider}`}>
      <div className={shared.container}>
        <Reveal>
          <div className={shared.sectionHeader}>
            <span className={shared.tagBadge}>{t('sectionTag')}</span>
            <h2 className={shared.sectionTitle}>{t('sectionTitle')}</h2>
            <p className={`${shared.subtitle} ${shared.subtitleCentered}`}>{t('sectionSubtitle')}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className={styles.tabs} role="tablist">
            {SERVICES_META.map((s, i) => (
              <button
                type="button"
                key={s.key}
                ref={el => { tabsRef.current[i] = el }}
                id={`tab-${s.key}`}
                role="tab"
                aria-selected={activeService === i}
                aria-controls={`service-panel-${s.key}`}
                tabIndex={activeService === i ? 0 : -1}
                onClick={() => switchTab(i)}
                onKeyDown={e => handleTabKeyDown(e, i)}
                className={`${styles.tab} ${activeService === i ? styles.tabActive : ''}`}
                style={{ '--accent': s.accent } as React.CSSProperties}
              >
                <div className={styles.tabTag}>{s.tag}</div>
                <span lang="en">{s.title}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div
          id={`service-panel-${svc.key}`}
          role="tabpanel"
          aria-labelledby={`tab-${svc.key}`}
          aria-live="polite"
          className={`${styles.panel} ${panelVisible ? styles.panelVisible : ''}`}
          style={{ '--accent': svc.accent, '--accent-text': svc.accentText } as React.CSSProperties}
        >
          <div className={styles.contentGrid}>
            <div>
              <div className={styles.contentHeader}>
                <div className={styles.accentBar} aria-hidden="true" />
                <h3 className={styles.contentTitle}><span lang="en">{svc.title}</span></h3>
              </div>
              <p className={styles.contentSubtitle}>{svcText.subtitle}</p>
              <p className={styles.contentIntro}>{svcText.intro}</p>
              <div className={styles.principles}>
                {svcText.principles.map((p) => (
                  <span key={p} className={styles.principle}>{p}</span>
                ))}
              </div>
            </div>
            <div className={styles.focusCards}>
              {svcText.focus.map((f, fi) => (
                <HoverCard key={f.title} accentColor={svc.accent} className={styles.focusCard}>
                  <div className={styles.focusIcon} aria-hidden="true">
                    <Icon icon={svc.focusIcons[fi]!} size={22} />
                  </div>
                  <div>
                    <h4 className={styles.focusTitle}>{f.title}</h4>
                    <p className={styles.focusDesc}>{f.desc}</p>
                  </div>
                </HoverCard>
              ))}
            </div>
          </div>

          <div className={styles.bottomGrid}>
            <div className={styles.audienceCard}>
              <h4 className={styles.audienceTitle}>{t('audienceTitle')}</h4>
              {svcText.audience.map((a) => (
                <div key={a} className={styles.audienceItem}>
                  <span className={styles.audienceArrow} aria-hidden="true">
                    <ArrowRight size={16} strokeWidth={2} />
                  </span>
                  <p className={styles.audienceText}>{a}</p>
                </div>
              ))}
            </div>
            <div className={styles.strengthsCard}>
              <h4 className={`${styles.audienceTitle} ${styles.strengthsTitle}`}>{t('strengthsTitle')}</h4>
              {svcText.strengths.map((s) => (
                <div key={s} className={styles.strengthItem}>
                  <div className={styles.strengthBar} aria-hidden="true" />
                  <p className={styles.strengthText}>{s}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.cta}>
            <button
              type="button"
              onClick={() => scrollTo('kontakt')}
              className={`${shared.btn} ${styles.ctaBtn}`}
            >
              {svc.title}{t('ctaSuffix')}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
