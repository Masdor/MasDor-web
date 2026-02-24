import { useState, useEffect, useRef } from 'react'
import styles from './ScrollProgress.module.css'

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const rafRef = useRef(0)

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const p = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0
      setProgress(p)
      rafRef.current = 0
    }

    const onScroll = () => {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      className={styles.bar}
      style={{ '--progress': progress } as React.CSSProperties}
      aria-hidden="true"
    />
  )
}
