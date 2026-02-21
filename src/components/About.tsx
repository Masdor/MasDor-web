import { Reveal } from '@/components/ui/Reveal'
import { HoverCard } from '@/components/ui/HoverCard'
import { TEAM_MEMBERS } from '@/data/team'
import { GOLD, DARK, CARD_BG, CARD_BORDER, TEXT_SECONDARY, TEXT_BODY, MONO } from '@/styles/tokens'

const tagBadgeStyle = { display: 'inline-block' as const, fontFamily: MONO, fontSize: 11, letterSpacing: 3, color: GOLD, textTransform: 'uppercase' as const, background: `${GOLD}0a`, padding: '6px 16px', borderRadius: 6, border: `1px solid ${GOLD}18` }
const sectionTitleStyle = { fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, letterSpacing: '-0.015em', lineHeight: 1.15 }
const subtitleStyle = { fontSize: 'clamp(1rem, 1.4vw, 1.1rem)', color: TEXT_SECONDARY, lineHeight: 1.7 }

const VALUE_CARDS = [
  { title: 'Unser Anspruch', text: 'Wir arbeiten methodisch, transparent und ursachenorientiert. Jede Maßnahme wird dokumentiert, jede Lösung ist nachvollziehbar. Unser Ziel ist nicht der schnellste Fix, sondern die stabilste Lösung.' },
  { title: 'Unsere Stärke', text: 'Die Kombination aus Medical-, Industrial- und IT-Kompetenz macht uns einzigartig. Wir verstehen Systeme im Zusammenspiel von Hardware, Software und Betriebsprozessen.' },
  { title: 'Unser Versprechen', text: 'Klare Kommunikation, ehrliche Einschätzungen und technische Arbeit, auf die man sich verlassen kann. Wir arbeiten partnerschaftlich – nicht als austauschbarer Dienstleister.' },
] as const

export function About() {
  return (
    <section id="about" style={{ padding: '120px 0 100px', background: 'var(--darker)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <Reveal>
          <span style={tagBadgeStyle}>ÜBER UNS</span>
          <h2 style={{ ...sectionTitleStyle, marginTop: 16, marginBottom: 20 }}>Engineering mit Verantwortung</h2>
          <p style={{ ...subtitleStyle, maxWidth: 680 }}>
            LAB-ROOT ist ein technisches Dienstleistungsunternehmen mit Sitz in Cham, Deutschland.
            Gegründet von Ingenieuren mit dem Anspruch, technische Probleme nachhaltig und dokumentiert zu lösen.
          </p>
        </Reveal>

        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 56 }}>
          {VALUE_CARDS.map((card, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <HoverCard glowOnHover style={{ padding: '40px 28px', background: DARK, border: `1px solid ${CARD_BORDER}`, borderRadius: 16, height: '100%' }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: GOLD }}>{card.title}</h3>
                <p style={{ fontSize: 15, color: TEXT_BODY, lineHeight: 1.8 }}>{card.text}</p>
              </HoverCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div style={{ marginTop: 72 }}>
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 32 }}>Team</h3>
            <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
              {TEAM_MEMBERS.map((m, i) => (
                <HoverCard key={i} glowOnHover style={{ display: 'flex', gap: 20, padding: '28px 24px', background: DARK, border: `1px solid ${CARD_BORDER}`, borderRadius: 14, alignItems: 'center' }}>
                  <div style={{ width: 60, height: 60, flexShrink: 0, background: `${GOLD}10`, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontWeight: 600, fontSize: 20, color: GOLD }}>{m.initials}</div>
                  <div>
                    <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 3 }}>{m.name}</h4>
                    <p style={{ fontSize: 13, color: GOLD, fontFamily: MONO, marginBottom: 6 }}>{m.role}</p>
                    <p style={{ fontSize: 13, color: TEXT_SECONDARY }}>{m.focus}</p>
                  </div>
                </HoverCard>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
