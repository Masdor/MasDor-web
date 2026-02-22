import { createContext, useCallback, useState, type ReactNode } from 'react'
import { useScrolled } from '@/hooks/useScrolled'
import { useActiveSection } from '@/hooks/useActiveSection'

interface NavigationContextType {
  scrollTo: (id: string) => void
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
  scrolled: boolean
  activeSection: string
}

// eslint-disable-next-line react-refresh/only-export-components
export const NavigationContext = createContext<NavigationContextType | null>(null)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useScrolled(50)
  const activeSection = useActiveSection()

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }, [])

  return (
    <NavigationContext.Provider value={{ scrollTo, menuOpen, setMenuOpen, scrolled, activeSection }}>
      {children}
    </NavigationContext.Provider>
  )
}
