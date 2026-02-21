import { useState, useEffect } from 'react'
import styles from './CookieConsent.module.css'

const STORAGE_KEY = 'lab-root-cookie-consent'

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  function reject() {
    localStorage.setItem(STORAGE_KEY, 'rejected')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className={styles.banner}>
      <p className={styles.text}>
        Diese Website verwendet ausschließlich technisch notwendige Cookies. Keine Tracking- oder Analyse-Cookies.{' '}
        <a href="#datenschutz" className={styles.link}>Datenschutzerklärung</a>
      </p>
      <div className={styles.actions}>
        <button onClick={accept} className={styles.accept}>Akzeptieren</button>
        <button onClick={reject} className={styles.reject}>Ablehnen</button>
      </div>
    </div>
  )
}
