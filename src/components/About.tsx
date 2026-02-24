import { Reveal } from '@/components/ui/Reveal'
import { HoverCard } from '@/components/ui/HoverCard'
import { TEAM_MEMBERS } from '@/data/team'
import shared from '@/styles/shared.module.css'
import styles from './About.module.css'

const VALUE_CARDS = [
  { title: 'Unser Anspruch', text: 'Wir arbeiten methodisch, transparent und ursachenorientiert. Jede Maßnahme wird dokumentiert, jede Lösung ist nachvollziehbar. Unser Ziel ist nicht der schnellste Fix, sondern die stabilste Lösung.' },
  { title: 'Unsere Stärke', text: 'Die Kombination aus Medical-, Industrial- und IT-Kompetenz macht uns einzigartig. Wir verstehen Systeme im Zusammenspiel von Hardware, Software und Betriebsprozessen.' },
  { title: 'Unser Versprechen', text: 'Klare Kommunikation, ehrliche Einschätzungen und technische Arbeit, auf die man sich verlassen kann. Wir arbeiten partnerschaftlich – nicht als austauschbarer Dienstleister.' },
] as const

export function About() {
  return (
    <section id="about" className={`${shared.section} ${shared.sectionDarker}`}>
      <div className={shared.containerNarrow}>
        <Reveal>
          <span className={shared.tagBadge}>ÜBER UNS</span>
          <h2 className={`${shared.sectionTitle} ${shared.sectionTitleSpaced}`}>Engineering mit Verantwortung</h2>
          <p className={`${shared.subtitle} ${styles.intro}`}>
            LAB-ROOT ist ein technisches Dienstleistungsunternehmen mit Sitz in Cham, Deutschland.
            Gegründet von Ingenieuren mit dem Anspruch, technische Probleme nachhaltig und dokumentiert zu lösen.
          </p>
        </Reveal>

        <div className={styles.valueGrid}>
          {VALUE_CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.1} direction={i === 0 ? 'left' : i === 2 ? 'right' : 'up'}>
              <HoverCard glowOnHover className={`${shared.cardDark} ${styles.valueCard}`}>
                <h3 className={styles.valueTitle}>{card.title}</h3>
                <p className={styles.valueText}>{card.text}</p>
              </HoverCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className={styles.teamSection}>
            <h3 className={styles.teamTitle}>Team</h3>
            <div className={styles.teamGrid}>
              {TEAM_MEMBERS.map((m) => (
                <HoverCard key={m.initials} glowOnHover className={`${shared.cardDark} ${styles.teamCard}`}>
                  <div className={styles.avatar}>{m.initials}</div>
                  <div>
                    <h4 className={styles.memberName}>{m.name}</h4>
                    <p className={styles.memberRole}>{m.role}</p>
                    <p className={styles.memberFocus}>{m.focus}</p>
                  </div>
                </HoverCard>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
