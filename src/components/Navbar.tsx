import { NAV_LINKS } from '@/data/navigation'
import styles from './Navbar.module.css'

interface NavbarProps {
  scrollTo: (id: string) => void
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
  scrolled: boolean
  activeSection: string
}

export function Navbar({ scrollTo, menuOpen, setMenuOpen, scrolled, activeSection }: NavbarProps) {
  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
      <div className={styles.inner}>
        <button onClick={() => scrollTo('home')} className={styles.logo}>
          <div className={styles.logoBox}>LR</div>
          <span className={styles.logoText}>LAB-ROOT</span>
        </button>

        <div className={styles.desktopNav}>
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`${styles.navLink} ${activeSection === link.id ? styles.navLinkActive : ''}`}
            >
              {link.label}
            </button>
          ))}
          <button onClick={() => scrollTo('kontakt')} className={styles.ctaBtn}>
            Anfrage senden
          </button>
        </div>

        <button
          className={styles.mobileToggle}
          aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`${styles.hamburgerLine} ${menuOpen ? `${styles.hamburgerOpen} ${styles.hamburgerOpenTop}` : ''}`}
          />
          {!menuOpen && <span className={styles.hamburgerLine} style={{ marginTop: 6 }} />}
          <span
            className={`${styles.hamburgerLine} ${menuOpen ? `${styles.hamburgerOpen} ${styles.hamburgerOpenBottom}` : ''}`}
          />
        </button>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {NAV_LINKS.map((link, i) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`${styles.mobileLink} ${i < NAV_LINKS.length - 1 ? styles.mobileLinkBorder : ''}`}
              style={{
                color: activeSection === link.id ? 'var(--gold)' : 'var(--text-secondary)',
                animationDelay: `${i * 0.05}s`,
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
