import { useTranslation } from 'react-i18next'
import { useNavigation } from '@/context/useNavigation'
import { NAV_LINKS } from '@/data/navigation'
import styles from './Footer.module.css'

const YEAR = new Date().getFullYear()

export function Footer() {
  const { scrollTo } = useNavigation()
  const { t } = useTranslation()
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.brandBox}>LR</div>
          <span className={styles.brandText}>{t('footer.tagline')}</span>
        </div>
        <nav className={styles.nav} aria-label={t('footer.navLabel')}>
          {NAV_LINKS.map(l => (
            <button type="button" key={l.id} onClick={() => scrollTo(l.id)} className={styles.navBtn}>{t(l.labelKey)}</button>
          ))}
        </nav>
        <p className={styles.legal}>
          {t('footer.copyright', { year: YEAR })} ·{' '}
          <a href="#impressum" className={styles.legalLink}>{t('footer.imprint')}</a> ·{' '}
          <a href="#datenschutz" className={styles.legalLink}>{t('footer.privacy')}</a>
        </p>
      </div>
    </footer>
  )
}
