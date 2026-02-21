import { useState, useRef, useCallback } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import { HoverCard } from '@/components/ui/HoverCard'
import { SERVICES } from '@/data/services'
import shared from '@/styles/shared.module.css'
import styles from './Services.module.css'

interface ServicesProps {
  scrollTo: (id: string) => void
}

export function Services({ scrollTo }: ServicesProps) {
  const [activeService, setActiveService] = useState(0)
  const svc = SERVICES[activeService]!
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])

  const handleTabKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    let next: number | null = null
    if (e.key === 'ArrowRight') next = (index + 1) % SERVICES.length
    else if (e.key === 'ArrowLeft') next = (index - 1 + SERVICES.length) % SERVICES.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = SERVICES.length - 1

    if (next !== null) {
      e.preventDefault()
      setActiveService(next)
      tabsRef.current[next]?.focus()
    }
  }, [])

  return (
    <section id="leistungen" className={styles.section}>
      <div className={styles.container}>
        <Reveal>
          <div className={shared.sectionHeader}>
            <span className={shared.tagBadge}>LEISTUNGEN</span>
            <h2 className={shared.sectionTitle}>Drei Bereiche. Ein Anspruch.</h2>
            <p className={shared.subtitleCentered}>Technische Exzellenz, strukturiertes Vorgehen und nachvollziehbare Ergebnisse.</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className={styles.tabs} role="tablist">
            {SERVICES.map((s, i) => (
              <button
                type="button"
                key={s.key}
                ref={el => { tabsRef.current[i] = el }}
                id={`tab-${s.key}`}
                role="tab"
                aria-selected={activeService === i}
                aria-controls={`service-panel-${s.key}`}
                tabIndex={activeService === i ? 0 : -1}
                onClick={() => setActiveService(i)}
                onKeyDown={e => handleTabKeyDown(e, i)}
                className={`${styles.tab} ${activeService === i ? styles.tabActive : ''}`}
                style={{ '--accent': s.accent } as React.CSSProperties}
              >
                <div className={styles.tabTag}>{s.tag}</div>
                {s.title}
              </button>
            ))}
          </div>
        </Reveal>

        <div
          key={svc.key}
          id={`service-panel-${svc.key}`}
          role="tabpanel"
          aria-labelledby={`tab-${svc.key}`}
          className={styles.fadeIn}
          style={{ '--accent': svc.accent, '--accent-text': svc.key === 'industrial' ? 'var(--dark)' : '#fff' } as React.CSSProperties}
        >
          <div className={styles.contentGrid}>
            <div>
              <div className={styles.contentHeader}>
                <div className={styles.accentBar} />
                <h3 className={styles.contentTitle}>{svc.title}</h3>
              </div>
              <p className={styles.contentSubtitle}>{svc.subtitle}</p>
              <p className={styles.contentIntro}>{svc.intro}</p>
              <div className={styles.principles}>
                {svc.principles.map((p, i) => (
                  <span key={i} className={styles.principle}>{p}</span>
                ))}
              </div>
            </div>
            <div className={styles.focusCards}>
              {svc.focus.map((f, i) => (
                <HoverCard key={i} accentColor={svc.accent} className={styles.focusCard}>
                  <div className={styles.focusIcon} aria-hidden="true">{f.icon}</div>
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
              <h4 className={styles.audienceTitle}>Zielgruppe</h4>
              {svc.audience.map((a, i) => (
                <div key={i} className={styles.audienceItem}>
                  <span className={styles.audienceArrow} aria-hidden="true">→</span>
                  <p className={styles.audienceText}>{a}</p>
                </div>
              ))}
            </div>
            <div className={styles.strengthsCard}>
              <h4 className={`${styles.audienceTitle} ${styles.strengthsTitle}`}>Warum LAB-ROOT</h4>
              {svc.strengths.map((s, i) => (
                <div key={i} className={styles.strengthItem}>
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
              {svc.title}-Anfrage senden
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
