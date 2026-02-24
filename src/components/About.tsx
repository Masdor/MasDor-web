import { useTranslation } from 'react-i18next'
import { Reveal } from '@/components/ui/Reveal'
import { HoverCard } from '@/components/ui/HoverCard'
import { TEAM_MEMBERS } from '@/data/team'
import shared from '@/styles/shared.module.css'
import styles from './About.module.css'

export function About() {
  const { t } = useTranslation('about')
  const values = t('values', { returnObjects: true }) as Array<{ title: string; text: string }>
  const members = t('members', { returnObjects: true }) as Array<{ focus: string }>

  return (
    <section id="about" className={`${shared.section} ${shared.sectionDarker}`}>
      <div className={shared.containerNarrow}>
        <Reveal>
          <span className={shared.tagBadge}>{t('sectionTag')}</span>
          <h2 className={`${shared.sectionTitle} ${shared.sectionTitleSpaced}`}>{t('sectionTitle')}</h2>
          <p className={`${shared.subtitle} ${styles.intro}`}>
            {t('intro')}
          </p>
        </Reveal>

        <div className={styles.valueGrid}>
          {values.map((card, i) => (
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
            <h3 className={styles.teamTitle}>{t('teamTitle')}</h3>
            <div className={styles.teamGrid}>
              {TEAM_MEMBERS.map((m) => (
                <HoverCard key={m.initials} glowOnHover className={`${shared.cardDark} ${styles.teamCard}`}>
                  <div className={styles.avatar}>{m.initials}</div>
                  <div>
                    <h4 className={styles.memberName}>{m.name}</h4>
                    <p className={styles.memberRole} lang="en">{m.role}</p>
                    <p className={styles.memberFocus}>{members[m.focusIndex]!.focus}</p>
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
