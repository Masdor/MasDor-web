import { useState, useEffect, lazy, Suspense } from 'react'
import { NavigationProvider } from '@/context/NavigationContext'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { ErrorBoundary } from '@/components/ErrorBoundary'
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
  const [legalPage, setLegalPage] = useState<'impressum' | 'datenschutz' | null>(null)

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
    <NavigationProvider>
      <div className={styles.app}>
        <Navbar />
        <main>
          <Hero />
          <ErrorBoundary>
            <Suspense fallback={<div className={styles.loading} aria-busy="true" />}>
              <Services />
              <Process />
              <TrustBar />
              <About />
              <Contact />
              <Footer />
              <CookieConsent />
              <Legal page={legalPage} onClose={() => setLegalPage(null)} />
            </Suspense>
          </ErrorBoundary>
        </main>
        <BackToTop />
      </div>
    </NavigationProvider>
  )
}
