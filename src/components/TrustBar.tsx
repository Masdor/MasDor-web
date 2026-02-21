import { Reveal } from '@/components/ui/Reveal'
import { CARD_BORDER, TEXT_SECONDARY, MONO } from '@/styles/tokens'

const TRUST_TAGS = ['ISO 13485-nah', 'IEC 62353', 'MPBetreibV', 'Technische Compliance', 'GMP-orientiert', 'TIA Portal', 'Docker', 'Zabbix']

export function TrustBar() {
  return (
    <Reveal>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 40,
          padding: '48px 32px', background: 'var(--darker)', borderRadius: 20,
          border: `1px solid ${CARD_BORDER}`, marginTop: -40, position: 'relative', zIndex: 2,
        }}>
          {TRUST_TAGS.map((t, i) => (
            <span key={i} style={{ fontFamily: MONO, fontSize: 12, color: TEXT_SECONDARY, letterSpacing: 1.5, opacity: 0.65 }}>{t}</span>
          ))}
        </div>
      </div>
    </Reveal>
  )
}
