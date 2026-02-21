import { useState, useEffect, useRef } from 'react'
import styles from './BackToTop.module.css'

export function BackToTop() {
  const [show, setShow] = useState(false)
  const rafRef = useRef(0)

  useEffect(() => {
    const handler = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0
        setShow(window.scrollY > 600)
      })
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => {
      window.removeEventListener('scroll', handler)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Nach oben"
      className={`${styles.button} ${show ? styles.visible : ''}`}
    >
      ↑
    </button>
  )
}
