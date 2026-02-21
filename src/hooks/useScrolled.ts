import { useState, useEffect, useRef } from 'react'

export function useScrolled(threshold = 50) {
  const [scrolled, setScrolled] = useState(false)
  const rafRef = useRef(0)

  useEffect(() => {
    const handler = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0
        setScrolled(window.scrollY > threshold)
      })
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => {
      window.removeEventListener('scroll', handler)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [threshold])

  return scrolled
}
