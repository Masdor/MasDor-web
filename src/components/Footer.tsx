import { NAV_LINKS } from '@/data/navigation'
import styles from './Footer.module.css'

interface FooterProps {
  scrollTo: (id: string) => void
}

export function Footer({ scrollTo }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.brandBox}>LR</div>
          <span className={styles.brandText}>LAB-ROOT — Engineering mit Verantwortung</span>
        </div>
        <div className={styles.nav}>
          {NAV_LINKS.map(l => (
            <button type="button" key={l.id} onClick={() => scrollTo(l.id)} className={styles.navBtn}>{l.label}</button>
          ))}
        </div>
        <p className={styles.legal}>
          © {new Date().getFullYear()} LAB-ROOT. Alle Rechte vorbehalten. ·{' '}
          <a href="#impressum" className={styles.legalLink}>Impressum</a> ·{' '}
          <a href="#datenschutz" className={styles.legalLink}>Datenschutz</a>
        </p>
      </div>
    </footer>
  )
}
