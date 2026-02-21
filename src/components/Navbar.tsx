import { useEffect } from 'react'
import { useNavigation } from '@/context/NavigationContext'
import { NAV_LINKS } from '@/data/navigation'
import styles from './Navbar.module.css'

export function Navbar() {
  const { scrollTo, menuOpen, setMenuOpen, scrolled, activeSection } = useNavigation()

  useEffect(() => {
    if (!menuOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen, setMenuOpen])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
      <div className={styles.inner}>
        <button type="button" onClick={() => scrollTo('home')} className={styles.logo}>
          <div className={styles.logoBox}>LR</div>
          <span className={styles.logoText}>LAB-ROOT</span>
        </button>

        <div className={styles.desktopNav}>
          {NAV_LINKS.map((link) => (
            <button
              type="button"
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`${styles.navLink} ${activeSection === link.id ? styles.navLinkActive : ''}`}
            >
              {link.label}
            </button>
          ))}
          <button type="button" onClick={() => scrollTo('kontakt')} className={styles.ctaBtn}>
            Anfrage senden
          </button>
        </div>

        <button
          type="button"
          className={styles.mobileToggle}
          aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`${styles.hamburgerLine} ${menuOpen ? `${styles.hamburgerOpen} ${styles.hamburgerOpenTop}` : ''}`}
          />
          {!menuOpen && <span className={`${styles.hamburgerLine} ${styles.hamburgerMiddle}`} />}
          <span
            className={`${styles.hamburgerLine} ${menuOpen ? `${styles.hamburgerOpen} ${styles.hamburgerOpenBottom}` : ''}`}
          />
        </button>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className={styles.mobileMenu} role="navigation" aria-label="Mobile Navigation">
          {NAV_LINKS.map((link, i) => (
            <button
              type="button"
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`${styles.mobileLink} ${i < NAV_LINKS.length - 1 ? styles.mobileLinkBorder : ''} ${activeSection === link.id ? styles.mobileLinkActive : ''}`}
              style={{ '--delay': `${i * 0.05}s` } as React.CSSProperties}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
