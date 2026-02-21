import { NAV_LINKS } from '@/data/navigation'
import { GOLD, DARK, TEXT_PRIMARY, TEXT_SECONDARY, CARD_BORDER, MONO, SANS } from '@/styles/tokens'
import styles from './Navbar.module.css'

interface NavbarProps {
  scrollTo: (id: string) => void
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
  scrolled: boolean
  activeSection: string
}

const btnStyle = {
  display: 'inline-block' as const,
  padding: '10px 24px',
  fontWeight: 600,
  fontSize: 13,
  borderRadius: 11,
  fontFamily: SANS,
  letterSpacing: '0.01em',
  transition: 'all 0.3s ease',
  marginLeft: 8,
  background: GOLD,
  color: DARK,
  border: 'none',
  cursor: 'pointer',
}

export function Navbar({ scrollTo, menuOpen, setMenuOpen, scrolled, activeSection }: NavbarProps) {
  return (
    <nav
      className={styles.nav}
      style={{
        background: scrolled ? 'rgba(11,15,21,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(1.2)' : 'none',
        borderBottom: scrolled ? `1px solid ${GOLD}15` : '1px solid transparent',
      }}
    >
      <div className={styles.inner}>
        <button onClick={() => scrollTo('home')} className={styles.logo}>
          <div className={styles.logoBox}>LR</div>
          <span className={styles.logoText}>LAB-ROOT</span>
        </button>

        <div className="desktop-nav" style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={styles.navLink}
              style={{
                background: activeSection === link.id ? `${GOLD}12` : 'none',
                color: activeSection === link.id ? GOLD : TEXT_SECONDARY,
              }}
            >
              {link.label}
            </button>
          ))}
          <button onClick={() => scrollTo('kontakt')} style={btnStyle}>
            Anfrage senden
          </button>
        </div>

        <button
          className="mobile-toggle"
          aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column' as const,
            gap: menuOpen ? 0 : 6,
            position: 'relative' as const,
          }}
        >
          <span
            style={{
              width: 24,
              height: 2,
              background: GOLD,
              borderRadius: 2,
              transition: 'all 0.3s',
              transform: menuOpen ? 'rotate(45deg) translateY(1px)' : 'none',
              position: menuOpen ? 'absolute' : 'relative',
            }}
          />
          {!menuOpen && (
            <span style={{ width: 24, height: 2, background: GOLD, borderRadius: 2 }} />
          )}
          <span
            style={{
              width: 24,
              height: 2,
              background: GOLD,
              borderRadius: 2,
              transition: 'all 0.3s',
              transform: menuOpen ? 'rotate(-45deg) translateY(-1px)' : 'none',
              position: menuOpen ? 'absolute' : 'relative',
            }}
          />
        </button>
      </div>

      {menuOpen && (
        <div
          className="mobile-menu"
          style={{
            background: 'rgba(11,15,21,0.97)',
            backdropFilter: 'blur(24px)',
            padding: '12px 24px 24px',
            borderTop: `1px solid ${GOLD}15`,
          }}
        >
          {NAV_LINKS.map((link, i) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '14px 0',
                fontSize: 16,
                fontWeight: 500,
                color: activeSection === link.id ? GOLD : TEXT_SECONDARY,
                borderBottom: i < NAV_LINKS.length - 1 ? `1px solid ${CARD_BORDER}` : 'none',
                fontFamily: SANS,
                animation: `slideIn 0.3s ease ${i * 0.05}s both`,
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
