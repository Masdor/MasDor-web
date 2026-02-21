import { useState, useEffect, useCallback, lazy, Suspense } from 'react'
import { useScrolled } from '@/hooks/useScrolled'
import { useActiveSection } from '@/hooks/useActiveSection'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { BackToTop } from '@/components/ui/BackToTop'
import styles from './App.module.css'

const Services = lazy(() => import('@/components/Services').then(m => ({ default: m.Services })))
const Process = lazy(() => import('@/components/Process').then(m => ({ default: m.Process })))
const TrustBar = lazy(() => import('@/components/TrustBar').then(m => ({ default: m.TrustBar })))
const About = lazy(() => import('@/components/About').then(m => ({ default: m.About })))
const Contact = lazy(() => import('@/components/Contact').then(m => ({ default: m.Contact })))
const Footer = lazy(() => import('@/components/Footer').then(m => ({ default: m.Footer })))
const Legal = lazy(() => import('@/components/Legal').then(m => ({ default: m.Legal })))
const CookieConsent = lazy(() => import('@/components/CookieConsent').then(m => ({ default: m.CookieConsent })))

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [legalPage, setLegalPage] = useState<'impressum' | 'datenschutz' | null>(null)
  const scrolled = useScrolled(50)
  const activeSection = useActiveSection()

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }, [])

  const handleLegalClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLAnchorElement
    if (target.hash === '#impressum') {
      e.preventDefault()
      setLegalPage('impressum')
    } else if (target.hash === '#datenschutz') {
      e.preventDefault()
      setLegalPage('datenschutz')
    }
  }, [])

  useEffect(() => {
    document.addEventListener('click', handleLegalClick as EventListener)
    return () => document.removeEventListener('click', handleLegalClick as EventListener)
  }, [handleLegalClick])

  return (
    <div className={styles.app}>
      <Navbar scrollTo={scrollTo} menuOpen={menuOpen} setMenuOpen={setMenuOpen} scrolled={scrolled} activeSection={activeSection} />
      <Hero scrollTo={scrollTo} />
      <Suspense fallback={null}>
        <Services scrollTo={scrollTo} />
        <Process />
        <TrustBar />
        <About />
        <Contact />
        <Footer scrollTo={scrollTo} />
        <CookieConsent />
        <Legal page={legalPage} onClose={() => setLegalPage(null)} />
      </Suspense>
      <BackToTop />
    </div>
  )
}
