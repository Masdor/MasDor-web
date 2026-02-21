import { useState } from 'react'
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

  return (
    <section id="leistungen" className={styles.section}>
      <div className={styles.container}>
        <Reveal>
          <div className={shared.sectionHeader}>
            <span className={shared.tagBadge}>LEISTUNGEN</span>
            <h2 className={shared.sectionTitle}>Drei Bereiche. Ein Anspruch.</h2>
            <p className={shared.subtitle} style={{ maxWidth: 560, margin: '16px auto 0' }}>Technische Exzellenz, strukturiertes Vorgehen und nachvollziehbare Ergebnisse.</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className={styles.tabs}>
            {SERVICES.map((s, i) => (
              <button
                key={s.key}
                onClick={() => setActiveService(i)}
                className={`${styles.tab} ${activeService === i ? styles.tabActive : ''}`}
                style={{
                  background: activeService === i ? `${s.accent}18` : undefined,
                  borderColor: activeService === i ? s.accent + '44' : undefined,
                  color: activeService === i ? s.accent : undefined,
                }}
              >
                <div className={styles.tabTag}>{s.tag}</div>
                {s.title}
              </button>
            ))}
          </div>
        </Reveal>

        <div key={svc.key} className={styles.fadeIn}>
          <div className={styles.contentGrid}>
            <div>
              <div className={styles.contentHeader}>
                <div className={styles.accentBar} style={{ background: svc.accent }} />
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
                  <div className={styles.focusIcon} style={{ background: `${svc.accent}10` }}>{f.icon}</div>
                  <div>
                    <h4 className={styles.focusTitle}>{f.title}</h4>
                    <p className={styles.focusDesc}>{f.desc}</p>
                  </div>
                </HoverCard>
              ))}
            </div>
          </div>

          <div className={styles.bottomGrid}>
            <div className={styles.audienceCard} style={{ background: `${svc.accent}06`, border: `1px solid ${svc.accent}15` }}>
              <h4 className={styles.audienceTitle} style={{ color: svc.accent }}>Zielgruppe</h4>
              {svc.audience.map((a, i) => (
                <div key={i} className={styles.audienceItem}>
                  <span className={styles.audienceArrow} style={{ color: svc.accent }}>→</span>
                  <p className={styles.audienceText}>{a}</p>
                </div>
              ))}
            </div>
            <div className={styles.strengthsCard}>
              <h4 className={styles.audienceTitle} style={{ color: 'var(--gold)' }}>Warum LAB-ROOT</h4>
              {svc.strengths.map((s, i) => (
                <div key={i} className={styles.strengthItem}>
                  <div className={styles.strengthBar} />
                  <p className={styles.strengthText}>{s}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.cta}>
            <button
              onClick={() => scrollTo('kontakt')}
              className={shared.btnPrimary}
              style={{ background: svc.accent, color: svc.key === 'industrial' ? 'var(--dark)' : '#fff' }}
            >
              {svc.title}-Anfrage senden
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
