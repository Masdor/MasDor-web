import { useState, useEffect, useRef } from 'react'
import { NAV_LINKS } from '@/data/navigation'

export function useActiveSection() {
  const [active, setActive] = useState('home')
  const rafRef = useRef(0)

  useEffect(() => {
    const handler = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0
        if (window.scrollY < 120) {
          setActive('home')
          return
        }
        const ids = NAV_LINKS.map((l) => l.id)
        for (let i = ids.length - 1; i >= 0; i--) {
          const id = ids[i]
          if (!id) continue
          const el = document.getElementById(id)
          if (el && el.getBoundingClientRect().top <= 120) {
            setActive(id)
            break
          }
        }
      })
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => {
      window.removeEventListener('scroll', handler)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return active
}
