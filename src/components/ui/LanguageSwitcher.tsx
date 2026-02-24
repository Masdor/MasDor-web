import { useTranslation } from 'react-i18next'
import styles from './LanguageSwitcher.module.css'

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  const currentLang = i18n.language

  const toggle = () => {
    const next = currentLang === 'de' ? 'en' : 'de'
    i18n.changeLanguage(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={styles.switcher}
      aria-label={t('language.switchLabel')}
      title={t('language.switchLabel')}
    >
      <span className={currentLang === 'de' ? styles.active : ''}>DE</span>
      <span className={styles.divider}>/</span>
      <span className={currentLang === 'en' ? styles.active : ''}>EN</span>
    </button>
  )
}
