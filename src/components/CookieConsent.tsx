import { useState, useEffect } from 'react'
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
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!safeGetItem(STORAGE_KEY)) setVisible(true)
  }, [])

  function accept() {
    safeSetItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  function reject() {
    safeSetItem(STORAGE_KEY, 'rejected')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className={styles.banner} role="dialog" aria-label="Cookie-Einstellungen">
      <p className={styles.text}>
        Diese Website verwendet ausschließlich technisch notwendige Cookies. Keine Tracking- oder Analyse-Cookies.{' '}
        <a href="#datenschutz" className={styles.link}>Datenschutzerklärung</a>
      </p>
      <div className={styles.actions}>
        <button type="button" onClick={accept} className={styles.accept}>Akzeptieren</button>
        <button type="button" onClick={reject} className={styles.reject}>Ablehnen</button>
      </div>
    </div>
  )
}
