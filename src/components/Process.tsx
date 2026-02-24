import { Reveal } from '@/components/ui/Reveal'
import { Icon } from '@/components/ui/Icon'
import { PROCESS_STEPS } from '@/data/process'
import shared from '@/styles/shared.module.css'
import styles from './Process.module.css'

export function Process() {
  return (
    <section id="methode" className={`${shared.section} ${shared.sectionDark}`}>
      <div className={shared.containerNarrow}>
        <Reveal>
          <div className={`${shared.sectionHeader} ${shared.sectionHeaderLg}`}>
            <span className={shared.tagBadge}>METHODE</span>
            <h2 className={shared.sectionTitle}>Strukturiert statt reaktiv</h2>
            <p className={`${shared.subtitle} ${shared.subtitleCentered}`}>Unser Vorgehen ist in allen Bereichen gleich: methodisch, dokumentiert und ursachenorientiert.</p>
          </div>
        </Reveal>

        <div className={styles.grid}>
          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.08}>
              <div className={styles.step}>
                <div className={styles.stepNum}>{step.num}</div>
                <div className={styles.stepIcon}>
                  <Icon icon={step.icon} size={24} />
                </div>
                <div className={styles.stepLabel}>SCHRITT {step.num}</div>
                <h4 className={styles.stepTitle}>{step.title}</h4>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
