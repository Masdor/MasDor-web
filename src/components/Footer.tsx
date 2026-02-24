import { useNavigation } from '@/context/useNavigation'
import { NAV_LINKS } from '@/data/navigation'
import styles from './Footer.module.css'

const YEAR = new Date().getFullYear()

export function Footer() {
  const { scrollTo } = useNavigation()
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.brandBox}>LR</div>
          <span className={styles.brandText}>LAB-ROOT — Engineering mit Verantwortung</span>
        </div>
        <nav className={styles.nav} aria-label="Footer Navigation">
          {NAV_LINKS.map(l => (
            <button type="button" key={l.id} onClick={() => scrollTo(l.id)} className={styles.navBtn}>{l.label}</button>
          ))}
        </nav>
        <p className={styles.legal}>
          © {YEAR} LAB-ROOT. Alle Rechte vorbehalten. ·{' '}
          <a href="#impressum" className={styles.legalLink}>Impressum</a> ·{' '}
          <a href="#datenschutz" className={styles.legalLink}>Datenschutz</a>
        </p>
      </div>
    </footer>
  )
}
