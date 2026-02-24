import { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react'
import { NavigationProvider } from '@/context/NavigationContext'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Analytics } from '@/components/Analytics'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { BackToTop } from '@/components/ui/BackToTop'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { SectionSkeleton } from '@/components/ui/SectionSkeleton'
import styles from './App.module.css'

const Services = lazy(() => import('@/components/Services').then(m => ({ default: m.Services })))
const Process = lazy(() => import('@/components/Process').then(m => ({ default: m.Process })))
const TrustBar = lazy(() => import('@/components/TrustBar').then(m => ({ default: m.TrustBar })))
const About = lazy(() => import('@/components/About').then(m => ({ default: m.About })))
const Portfolio = lazy(() => import('@/components/Portfolio').then(m => ({ default: m.Portfolio })))
const Faq = lazy(() => import('@/components/Faq').then(m => ({ default: m.Faq })))
const CtaBanner = lazy(() => import('@/components/CtaBanner').then(m => ({ default: m.CtaBanner })))
const Contact = lazy(() => import('@/components/Contact').then(m => ({ default: m.Contact })))
const Footer = lazy(() => import('@/components/Footer').then(m => ({ default: m.Footer })))
const Legal = lazy(() => import('@/components/Legal').then(m => ({ default: m.Legal })))
const CookieConsent = lazy(() => import('@/components/CookieConsent').then(m => ({ default: m.CookieConsent })))

function parseLegalHash(hash: string): 'impressum' | 'datenschutz' | null {
  if (hash === '#impressum') return 'impressum'
  if (hash === '#datenschutz') return 'datenschutz'
  return null
}

export default function App() {
  const [legalPage, setLegalPage] = useState<'impressum' | 'datenschutz' | null>(() =>
    parseLegalHash(window.location.hash),
  )
  const legalTriggerRef = useRef<HTMLElement | null>(null)

  const openLegal = useCallback((page: 'impressum' | 'datenschutz') => {
    legalTriggerRef.current = document.activeElement as HTMLElement
    setLegalPage(page)
    window.history.pushState(null, '', `#${page}`)
  }, [])

  const closeLegal = useCallback(() => {
    setLegalPage(null)
    window.history.pushState(null, '', window.location.pathname)
    requestAnimationFrame(() => { legalTriggerRef.current?.focus() })
  }, [])

  useEffect(() => {
    const handler = (e: Event) => {
      const target = e.target
      if (!(target instanceof HTMLAnchorElement)) return
      const page = parseLegalHash(target.hash)
      if (page) {
        e.preventDefault()
        openLegal(page)
      }
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [openLegal])

  useEffect(() => {
    const onPopState = () => {
      setLegalPage(parseLegalHash(window.location.hash))
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  return (
    <NavigationProvider>
      <div className={styles.app}>
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <ErrorBoundary variant="section">
            {/* Gruppe 1 — Direkt nach Hero, höchste Lade-Priorität */}
            <Suspense fallback={
              <SectionSkeleton rows={[56, 320, 200]} aria-label="Leistungen werden geladen" />
            }>
              <Services />
              <Process />
            </Suspense>

            {/* Gruppe 2 — Mittlerer Bereich */}
            <Suspense fallback={
              <SectionSkeleton rows={[80, 180, 180, 180]} aria-label="Über uns wird geladen" />
            }>
              <TrustBar />
              <About />
            </Suspense>

            {/* Gruppe 3 — Inhaltslastig */}
            <Suspense fallback={
              <SectionSkeleton rows={[56, 240, 240, 160]} aria-label="Referenzen werden geladen" />
            }>
              <Portfolio />
              <Faq />
              <CtaBanner />
            </Suspense>

            {/* Gruppe 4 — Seitenende */}
            <Suspense fallback={
              <SectionSkeleton rows={[56, 280, 80]} aria-label="Kontakt wird geladen" />
            }>
              <Contact />
              <Footer />
            </Suspense>
          </ErrorBoundary>
          <Suspense fallback={null}>
            <CookieConsent />
            <Legal page={legalPage} onClose={closeLegal} />
          </Suspense>
          <Analytics />
        </main>
        <BackToTop />
      </div>
    </NavigationProvider>
  )
}
