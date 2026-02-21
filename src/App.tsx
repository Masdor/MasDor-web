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

  useEffect(() => {
    const handler = (e: Event) => {
      const target = e.target
      if (!(target instanceof HTMLAnchorElement)) return
      if (target.hash === '#impressum') {
        e.preventDefault()
        setLegalPage('impressum')
      } else if (target.hash === '#datenschutz') {
        e.preventDefault()
        setLegalPage('datenschutz')
      }
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  return (
    <div className={styles.app}>
      <Navbar scrollTo={scrollTo} menuOpen={menuOpen} setMenuOpen={setMenuOpen} scrolled={scrolled} activeSection={activeSection} />
      <main>
        <Hero scrollTo={scrollTo} />
        <Suspense fallback={<div className={styles.loading} aria-busy="true" />}>
          <Services scrollTo={scrollTo} />
          <Process />
          <TrustBar />
          <About />
          <Contact />
          <Footer scrollTo={scrollTo} />
          <CookieConsent />
          <Legal page={legalPage} onClose={() => setLegalPage(null)} />
        </Suspense>
      </main>
      <BackToTop />
    </div>
  )
}
