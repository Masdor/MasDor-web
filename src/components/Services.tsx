import { useState } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import { HoverCard } from '@/components/ui/HoverCard'
import { SERVICES } from '@/data/services'
import { GOLD, DARK, CARD_BG, CARD_BORDER, TEXT_SECONDARY, TEXT_BODY, MONO, SANS } from '@/styles/tokens'
import styles from './Services.module.css'

const tagBadgeStyle = { display: 'inline-block' as const, fontFamily: MONO, fontSize: 11, letterSpacing: 3, color: GOLD, textTransform: 'uppercase' as const, background: `${GOLD}0a`, padding: '6px 16px', borderRadius: 6, border: `1px solid ${GOLD}18` }
const sectionTitleStyle = { fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, letterSpacing: '-0.015em', lineHeight: 1.15 }
const subtitleStyle = { fontSize: 'clamp(1rem, 1.4vw, 1.1rem)', color: TEXT_SECONDARY, lineHeight: 1.7 }
const btnStyle = { display: 'inline-block' as const, fontWeight: 600, borderRadius: 11, fontFamily: SANS, letterSpacing: '0.01em', transition: 'all 0.3s ease', cursor: 'pointer', padding: '14px 36px', fontSize: 15, border: 'none' }

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
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={tagBadgeStyle}>LEISTUNGEN</span>
            <h2 style={{ ...sectionTitleStyle, marginTop: 16 }}>Drei Bereiche. Ein Anspruch.</h2>
            <p style={{ ...subtitleStyle, maxWidth: 560, margin: '16px auto 0' }}>Technische Exzellenz, strukturiertes Vorgehen und nachvollziehbare Ergebnisse.</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="service-tabs" style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 56 }}>
            {SERVICES.map((s, i) => (
              <button key={s.key} onClick={() => setActiveService(i)} style={{
                background: activeService === i ? `${s.accent}18` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${activeService === i ? s.accent + '44' : CARD_BORDER}`,
                borderRadius: 12, padding: '16px 28px', cursor: 'pointer', transition: 'all 0.3s ease',
                color: activeService === i ? s.accent : TEXT_SECONDARY,
                fontFamily: SANS, fontWeight: activeService === i ? 600 : 500, fontSize: 15, flex: '1 1 0', maxWidth: 280,
              }}>
                <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: 2, marginBottom: 8, opacity: 0.7 }}>{s.tag}</div>
                {s.title}
              </button>
            ))}
          </div>
        </Reveal>

        <div key={svc.key} style={{ animation: 'fadeTab 0.4s ease' }}>
          <div className="focus-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginBottom: 56, alignItems: 'start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ width: 4, height: 32, background: svc.accent, borderRadius: 2 }} />
                <h3 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 700 }}>{svc.title}</h3>
              </div>
              <p style={{ color: TEXT_SECONDARY, fontSize: 17, lineHeight: 1.7, marginBottom: 16 }}>{svc.subtitle}</p>
              <p style={{ color: TEXT_BODY, fontSize: 15, lineHeight: 1.8 }}>{svc.intro}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 28 }}>
                {svc.principles.map((p, i) => (
                  <span key={i} style={{ padding: '8px 16px', fontSize: 13, color: TEXT_BODY, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 100 }}>{p}</span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {svc.focus.map((f, i) => (
                <HoverCard key={i} accentColor={svc.accent} style={{ display: 'flex', gap: 16, padding: '20px 18px', background: CARD_BG, borderRadius: 14, border: `1px solid ${CARD_BORDER}` }}>
                  <div style={{ fontSize: 22, flexShrink: 0, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${svc.accent}10`, borderRadius: 10 }}>{f.icon}</div>
                  <div>
                    <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{f.title}</h4>
                    <p style={{ fontSize: 13, color: TEXT_SECONDARY, lineHeight: 1.6 }}>{f.desc}</p>
                  </div>
                </HoverCard>
              ))}
            </div>
          </div>

          <div className="focus-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div style={{ padding: '36px 32px', background: `${svc.accent}06`, borderRadius: 16, border: `1px solid ${svc.accent}15` }}>
              <h4 style={{ fontFamily: MONO, fontSize: 12, letterSpacing: 2, color: svc.accent, marginBottom: 24, textTransform: 'uppercase' }}>Zielgruppe</h4>
              {svc.audience.map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: i < svc.audience.length - 1 ? 16 : 0 }}>
                  <span style={{ color: svc.accent, fontFamily: MONO, fontSize: 16, marginTop: 1, flexShrink: 0 }}>→</span>
                  <p style={{ fontSize: 14, color: TEXT_BODY, lineHeight: 1.65 }}>{a}</p>
                </div>
              ))}
            </div>
            <div style={{ padding: '36px 32px', background: CARD_BG, borderRadius: 16, border: `1px solid ${CARD_BORDER}` }}>
              <h4 style={{ fontFamily: MONO, fontSize: 12, letterSpacing: 2, color: GOLD, marginBottom: 24, textTransform: 'uppercase' }}>Warum LAB-ROOT</h4>
              {svc.strengths.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: i < svc.strengths.length - 1 ? 16 : 0 }}>
                  <div style={{ width: 3, height: 20, background: GOLD, borderRadius: 2, marginTop: 2, flexShrink: 0 }} />
                  <p style={{ fontSize: 14, color: TEXT_BODY, lineHeight: 1.65 }}>{s}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 48, textAlign: 'center' }}>
            <button onClick={() => scrollTo('kontakt')} style={{
              ...btnStyle, background: svc.accent, color: svc.key === 'industrial' ? DARK : '#fff',
            }}>{svc.title}-Anfrage senden</button>
          </div>
        </div>
      </div>
    </section>
  )
}
