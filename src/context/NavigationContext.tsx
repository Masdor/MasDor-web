import { createContext, useCallback, useState, useEffect, useRef, useMemo, type ReactNode } from 'react'
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

const SECTION_IDS = NAV_LINKS.map((l) => l.id)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [showBackToTop, setShowBackToTop] = useState(false)
  const rafRef = useRef(0)

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    const visibleSections = new Map<string, boolean>()

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id)
      if (!el) continue
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry) visibleSections.set(id, entry.isIntersecting)
        },
        { rootMargin: '-80px 0px -40% 0px', threshold: 0 },
      )
      observer.observe(el)
      observers.push(observer)
    }

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
        for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
          const id = SECTION_IDS[i]
          if (id && visibleSections.get(id)) {
            setActiveSection(id)
            return
          }
        }
      })
    }
    window.addEventListener('scroll', handler, { passive: true })

    return () => {
      window.removeEventListener('scroll', handler)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      for (const o of observers) o.disconnect()
    }
  }, [])

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }, [])

  const value = useMemo(
    () => ({ scrollTo, menuOpen, setMenuOpen, scrolled, activeSection, showBackToTop }),
    [scrollTo, menuOpen, scrolled, activeSection, showBackToTop],
  )

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  )
}
