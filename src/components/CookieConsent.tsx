import { useState } from 'react'
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
  const [consent, setConsent] = useState<string | null>(() => safeGetItem(STORAGE_KEY))
  const [animateOut, setAnimateOut] = useState(false)
  const [removed, setRemoved] = useState(false)

  // Already consented on mount
  if (consent && !animateOut && !removed) {
    return null
  }

  function handleChoice(choice: string) {
    safeSetItem(STORAGE_KEY, choice)
    setAnimateOut(true)
    setTimeout(() => {
      setConsent(choice)
      setRemoved(true)
    }, 400)
  }

  if (removed) return null

  return (
    <div className={`${styles.banner} ${animateOut ? styles.bannerHidden : ''}`} role="dialog" aria-label="Cookie-Einstellungen">
      <p className={styles.text}>
        Diese Website verwendet ausschließlich technisch notwendige Cookies. Keine Tracking- oder Analyse-Cookies.{' '}
        <a href="#datenschutz" className={styles.link}>Datenschutzerklärung</a>
      </p>
      <div className={styles.actions}>
        <button type="button" onClick={() => handleChoice('accepted')} className={styles.accept}>Akzeptieren</button>
        <button type="button" onClick={() => handleChoice('rejected')} className={styles.reject}>Ablehnen</button>
      </div>
    </div>
  )
}
