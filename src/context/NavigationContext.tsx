import { createContext, useCallback, useState, useEffect, useRef, type ReactNode } from 'react'
import { NAV_LINKS } from '@/data/navigation'

interface NavigationContextType {
  scrollTo: (id: string) => void
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
  scrolled: boolean
  activeSection: string
  showBackToTop: boolean
}

// eslint-disable-next-line react-refresh/only-export-components
export const NavigationContext = createContext<NavigationContextType | null>(null)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [showBackToTop, setShowBackToTop] = useState(false)
  const rafRef = useRef(0)

  useEffect(() => {
    const handler = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0
        const y = window.scrollY

        setScrolled(y > 50)
        setShowBackToTop(y > 600)

        if (y < 120) {
          setActiveSection('home')
          return
        }
        const ids = NAV_LINKS.map((l) => l.id)
        for (let i = ids.length - 1; i >= 0; i--) {
          const id = ids[i]
          if (!id) continue
          const el = document.getElementById(id)
          if (el && el.getBoundingClientRect().top <= 120) {
            setActiveSection(id)
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

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }, [])

  return (
    <NavigationContext.Provider value={{ scrollTo, menuOpen, setMenuOpen, scrolled, activeSection, showBackToTop }}>
      {children}
    </NavigationContext.Provider>
  )
}
