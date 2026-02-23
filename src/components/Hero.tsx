import { useNavigation } from '@/context/useNavigation'
import { Reveal } from '@/components/ui/Reveal'
import { ParticleField } from '@/components/ui/ParticleField'
import { Counter } from '@/components/ui/Counter'
import { useInView } from '@/hooks/useInView'
import shared from '@/styles/shared.module.css'
import styles from './Hero.module.css'

export function Hero() {
  const { scrollTo } = useNavigation()
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
          <h1 className={styles.title}>
            Precision Engineering.<br />
            <span className={styles.titleAccent}>Intelligente Lösungen.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className={styles.subtitle}>
            Spezialisierte technische Dienstleistungen für Medical, Industrial und IT-Infrastruktur.
            Strukturierte Fehleranalyse, belastbare Instandhaltung und dokumentierte Umsetzung –
            von Ingenieuren, für den realen Betrieb.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className={styles.actions}>
            <button type="button" onClick={() => scrollTo('kontakt')} className={shared.btnPrimary}>Projekt anfragen</button>
            <button type="button" onClick={() => scrollTo('leistungen')} className={shared.btnOutline}>Leistungen entdecken</button>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div ref={statsRef} className={styles.statsGrid}>
            {[
              { end: 3, label: 'Fachbereiche', static: '3' },
              { end: 100, suffix: '%', label: 'Dokumentiert' },
              { end: 0, label: 'Reaktionszeit', static: '<24h' },
              { end: 0, label: 'Standort', static: 'DE' },
            ].map((s, i) => (
              <div key={i} className={styles.statCell}>
                <div className={styles.statValue}>
                  {s.static ? s.static : <Counter end={s.end} suffix={s.suffix || ''} trigger={statsVisible} />}
                </div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <div className={styles.scrollIndicator}>
        <span className={styles.scrollArrow}>↓</span>
      </div>
    </section>
  )
}
