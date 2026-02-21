import { useState, useCallback } from 'react'
import { useScrolled } from '@/hooks/useScrolled'
import { useActiveSection } from '@/hooks/useActiveSection'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Services } from '@/components/Services'
import { Process } from '@/components/Process'
import { TrustBar } from '@/components/TrustBar'
import { About } from '@/components/About'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { BackToTop } from '@/components/ui/BackToTop'
import styles from './App.module.css'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useScrolled(50)
  const activeSection = useActiveSection()

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }, [])

  return (
    <div className={styles.app}>
      <Navbar scrollTo={scrollTo} menuOpen={menuOpen} setMenuOpen={setMenuOpen} scrolled={scrolled} activeSection={activeSection} />
      <Hero scrollTo={scrollTo} />
      <Services scrollTo={scrollTo} />
      <Process />
      <TrustBar />
      <About />
      <Contact />
      <Footer scrollTo={scrollTo} />
      <BackToTop />
    </div>
  )
}
