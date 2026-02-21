import { Reveal } from '@/components/ui/Reveal'
import { PROCESS_STEPS } from '@/data/process'
import { GOLD, CARD_BG, CARD_BORDER, TEXT_SECONDARY, MONO } from '@/styles/tokens'

const tagBadgeStyle = { display: 'inline-block' as const, fontFamily: MONO, fontSize: 11, letterSpacing: 3, color: GOLD, textTransform: 'uppercase' as const, background: `${GOLD}0a`, padding: '6px 16px', borderRadius: 6, border: `1px solid ${GOLD}18` }
const sectionTitleStyle = { fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, letterSpacing: '-0.015em', lineHeight: 1.15 }
const subtitleStyle = { fontSize: 'clamp(1rem, 1.4vw, 1.1rem)', color: TEXT_SECONDARY, lineHeight: 1.7 }

export function Process() {
  return (
    <section id="methode" style={{ padding: '120px 0 100px', background: 'var(--dark)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <span style={tagBadgeStyle}>METHODE</span>
            <h2 style={{ ...sectionTitleStyle, marginTop: 16 }}>Strukturiert statt reaktiv</h2>
            <p style={{ ...subtitleStyle, maxWidth: 520, margin: '16px auto 0' }}>Unser Vorgehen ist in allen Bereichen gleich: methodisch, dokumentiert und ursachenorientiert.</p>
          </div>
        </Reveal>

        <div className="process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{
                padding: '32px 20px', background: CARD_BG, borderRadius: 16,
                border: `1px solid ${CARD_BORDER}`, textAlign: 'center', height: '100%',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: -12, right: -8, fontFamily: MONO, fontSize: 72, fontWeight: 700, color: `${GOLD}06`, lineHeight: 1 }}>{step.num}</div>
                <div style={{ width: 48, height: 48, margin: '0 auto 20px', background: `${GOLD}08`, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: GOLD }}>{step.icon}</div>
                <div style={{ fontFamily: MONO, fontSize: 11, color: GOLD, letterSpacing: 2, marginBottom: 8 }}>SCHRITT {step.num}</div>
                <h4 style={{ fontSize: 17, fontWeight: 600, marginBottom: 12 }}>{step.title}</h4>
                <p style={{ fontSize: 13, color: TEXT_SECONDARY, lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
