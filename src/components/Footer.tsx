import { NAV_LINKS } from '@/data/navigation'
import { GOLD, CARD_BORDER, TEXT_SECONDARY, MONO, SANS } from '@/styles/tokens'

interface FooterProps {
  scrollTo: (id: string) => void
}

export function Footer({ scrollTo }: FooterProps) {
  return (
    <footer style={{ padding: '40px 24px 28px', borderTop: `1px solid ${CARD_BORDER}`, background: 'var(--darker)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 26, height: 26, border: `1.5px solid ${GOLD}`, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontWeight: 600, fontSize: 9, color: GOLD }}>LR</div>
          <span style={{ fontFamily: MONO, fontSize: 12, color: TEXT_SECONDARY }}>LAB-ROOT — Engineering mit Verantwortung</span>
        </div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {NAV_LINKS.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: TEXT_SECONDARY, fontFamily: SANS }}>{l.label}</button>
          ))}
        </div>
        <p style={{ fontSize: 12, color: '#3d444d' }}>
          © {new Date().getFullYear()} LAB-ROOT. Alle Rechte vorbehalten. ·{' '}
          <a href="#impressum" style={{ color: '#3d444d', textDecoration: 'underline' }}>Impressum</a> ·{' '}
          <a href="#datenschutz" style={{ color: '#3d444d', textDecoration: 'underline' }}>Datenschutz</a>
        </p>
      </div>
    </footer>
  )
}
