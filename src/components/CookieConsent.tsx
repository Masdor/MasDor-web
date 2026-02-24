import { useState, useRef, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './CookieConsent.module.css'

const STORAGE_KEY = 'lab-root-cookie-consent'

function safeGetItem(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function safeSetItem(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch {
    // Storage unavailable (private mode, quota exceeded) — silently ignore
  }
}

export function CookieConsent() {
  const { t } = useTranslation()
  const [consent, setConsent] = useState<string | null>(() => safeGetItem(STORAGE_KEY))
  const [animateOut, setAnimateOut] = useState(false)
  const [removed, setRemoved] = useState(false)
  const acceptRef = useRef<HTMLButtonElement>(null)

  const handleChoice = useCallback((choice: string) => {
    safeSetItem(STORAGE_KEY, choice)
    setAnimateOut(true)
    setTimeout(() => {
      setConsent(choice)
      setRemoved(true)
    }, 400)
  }, [])

  // Auto-focus accept button when banner appears
  useEffect(() => {
    if (consent || removed) return
    const timer = setTimeout(() => { acceptRef.current?.focus() }, 500)
    return () => clearTimeout(timer)
  }, [consent, removed])

  // Escape key dismisses the banner
  useEffect(() => {
    if (consent || removed) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleChoice('rejected')
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [consent, removed, handleChoice])

  // Already consented on mount
  if (consent && !animateOut && !removed) {
    return null
  }

  if (removed) return null

  return (
    <div className={`${styles.banner} ${animateOut ? styles.bannerHidden : ''}`} role="dialog" aria-label={t('cookie.ariaLabel')}>
      <p className={styles.text}>
        {t('cookie.text')}{' '}
        <a href="#datenschutz" className={styles.link}>{t('cookie.privacyLink')}</a>
      </p>
      <div className={styles.actions}>
        <button ref={acceptRef} type="button" onClick={() => handleChoice('accepted')} className={styles.accept}>{t('cookie.accept')}</button>
        <button type="button" onClick={() => handleChoice('rejected')} className={styles.reject}>{t('cookie.reject')}</button>
      </div>
    </div>
  )
}
