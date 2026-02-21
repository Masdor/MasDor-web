import { Reveal } from '@/components/ui/Reveal'
import { ParticleField } from '@/components/ui/ParticleField'
import { Counter } from '@/components/ui/Counter'
import { useInView } from '@/hooks/useInView'
import { GOLD, DARK, TEXT_PRIMARY, TEXT_SECONDARY, MONO, SANS } from '@/styles/tokens'
import styles from './Hero.module.css'

interface HeroProps {
  scrollTo: (id: string) => void
}

const btnStyle = {
  display: 'inline-block' as const,
  fontWeight: 600,
  borderRadius: 11,
  fontFamily: SANS,
  letterSpacing: '0.01em',
  transition: 'all 0.3s ease',
  fontSize: 15,
  padding: '16px 36px',
  cursor: 'pointer',
}

export function Hero({ scrollTo }: HeroProps) {
  const [statsRef, statsVisible] = useInView(0.3)

  return (
    <section id="home" className={styles.hero}>
      <ParticleField />
      <div className={styles.grid} />
      <div className={styles.glowGold} />
      <div className={styles.glowGreen} />

      <div className={styles.content}>
        <Reveal>
          <div className={styles.tagline}>
            <span className={styles.statusDot} />
            ENGINEERING · DIAGNOSTICS · RELIABILITY
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="hero-title" style={{ fontSize: 'clamp(2.6rem, 6vw, 4.8rem)', fontWeight: 700, lineHeight: 1.06, letterSpacing: '-0.025em', marginBottom: 28, maxWidth: 820 }}>
            Precision Engineering.<br />
            <span style={{ color: GOLD }}>Intelligente Lösungen.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.2rem)', color: TEXT_SECONDARY, lineHeight: 1.75, maxWidth: 600, marginBottom: 48 }}>
            Spezialisierte technische Dienstleistungen für Medical, Industrial und IT-Infrastruktur.
            Strukturierte Fehleranalyse, belastbare Instandhaltung und dokumentierte Umsetzung –
            von Ingenieuren, für den realen Betrieb.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button onClick={() => scrollTo('kontakt')} style={{ ...btnStyle, background: GOLD, color: DARK, border: 'none' }}>Projekt anfragen</button>
            <button onClick={() => scrollTo('leistungen')} style={{ ...btnStyle, background: 'transparent', color: TEXT_PRIMARY, border: '1px solid rgba(255,255,255,0.15)' }}>Leistungen entdecken</button>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div ref={statsRef} className="stats-grid" style={{ marginTop: 80, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: `${GOLD}12`, borderRadius: 16, overflow: 'hidden', border: `1px solid ${GOLD}15` }}>
            {[
              { end: 3, label: 'Fachbereiche', static: '3' },
              { end: 100, suffix: '%', label: 'Dokumentiert' },
              { end: 0, label: 'Reaktionszeit', static: '<24h' },
              { end: 0, label: 'Standort', static: 'DE' },
            ].map((s, i) => (
              <div key={i} style={{ padding: '32px 20px', background: DARK, textAlign: 'center' }}>
                <div style={{ fontFamily: MONO, fontSize: 30, fontWeight: 600, color: GOLD, marginBottom: 6 }}>
                  {s.static ? s.static : <Counter end={s.end} suffix={s.suffix || ''} trigger={statsVisible} />}
                </div>
                <div style={{ fontSize: 13, color: TEXT_SECONDARY, letterSpacing: 0.5 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
