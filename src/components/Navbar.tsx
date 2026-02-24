import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@/context/useNavigation'
import { NAV_LINKS } from '@/data/navigation'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import styles from './Navbar.module.css'

export function Navbar() {
  const { scrollTo, menuOpen, setMenuOpen, scrolled, activeSection } = useNavigation()
  const { t } = useTranslation()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen) return

    document.body.classList.add('menu-open')

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (e.key === 'Tab') {
        const focusable: HTMLElement[] = []
        if (toggleRef.current) focusable.push(toggleRef.current)
        if (menuRef.current) {
          focusable.push(
            ...menuRef.current.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])'),
          )
        }
        if (focusable.length === 0) return
        const first = focusable[0]!
        const last = focusable[focusable.length - 1]!
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('menu-open')
    }
  }, [menuOpen, setMenuOpen])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`} aria-label={t('nav.mainNav')}>
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
              {t(link.labelKey)}
            </button>
          ))}
          <button type="button" onClick={() => scrollTo('kontakt')} className={styles.ctaBtn}>
            {t('nav.cta')}
          </button>
          <LanguageSwitcher />
        </div>

        <button
          ref={toggleRef}
          type="button"
          className={styles.mobileToggle}
          aria-label={menuOpen ? t('nav.menuClose') : t('nav.menuOpen')}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-haspopup="true"
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
        <>
          <div className={styles.mobileOverlay} onClick={() => setMenuOpen(false)} aria-hidden="true" />
          <div ref={menuRef} id="mobile-menu" className={styles.mobileMenu} role="navigation" aria-label={t('nav.mobileNav')}>
            {NAV_LINKS.map((link, i) => (
              <button
                type="button"
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`${styles.mobileLink} ${i < NAV_LINKS.length - 1 ? styles.mobileLinkBorder : ''} ${activeSection === link.id ? styles.mobileLinkActive : ''}`}
                style={{ '--delay': `${i * 0.05}s` } as React.CSSProperties}
              >
                {t(link.labelKey)}
              </button>
            ))}
            <div className={styles.mobileLink} style={{ '--delay': `${NAV_LINKS.length * 0.05}s` } as React.CSSProperties}>
              <LanguageSwitcher />
            </div>
          </div>
        </>
      )}
    </nav>
  )
}
