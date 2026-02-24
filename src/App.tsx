import { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react'
import { NavigationProvider } from '@/context/NavigationContext'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { BackToTop } from '@/components/ui/BackToTop'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import styles from './App.module.css'

const Services = lazy(() => import('@/components/Services').then(m => ({ default: m.Services })))
const Process = lazy(() => import('@/components/Process').then(m => ({ default: m.Process })))
const TrustBar = lazy(() => import('@/components/TrustBar').then(m => ({ default: m.TrustBar })))
const About = lazy(() => import('@/components/About').then(m => ({ default: m.About })))
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
            <Suspense fallback={<div className={styles.loading} aria-busy="true" />}>
              <Services />
              <Process />
            </Suspense>
            <Suspense fallback={<div className={styles.loading} aria-busy="true" />}>
              <TrustBar />
              <About />
              <Contact />
              <Footer />
            </Suspense>
          </ErrorBoundary>
          <Suspense fallback={null}>
            <CookieConsent />
            <Legal page={legalPage} onClose={closeLegal} />
          </Suspense>
        </main>
        <BackToTop />
      </div>
    </NavigationProvider>
  )
}
