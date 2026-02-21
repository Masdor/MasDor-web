import { useState, useEffect } from 'react'
import { NAV_LINKS } from '@/data/navigation'

export function useActiveSection() {
  const [active, setActive] = useState('home')
  useEffect(() => {
    const handler = () => {
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
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return active
}
