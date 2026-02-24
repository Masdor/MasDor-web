import { useState, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Reveal } from '@/components/ui/Reveal'
import { ChevronDown } from 'lucide-react'
import { FAQ_IDS } from '@/data/faq'
import shared from '@/styles/shared.module.css'
import styles from './Faq.module.css'

export function Faq() {
  const { t } = useTranslation('faq')
  const [openId, setOpenId] = useState<string | null>(null)
  const contentRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const items = t('items', { returnObjects: true }) as Array<{ question: string; answer: string }>

  const toggle = useCallback((id: string) => {
    setOpenId(prev => (prev === id ? null : id))
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, _id: string, index: number) => {
      let targetIndex: number | null = null

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        targetIndex = (index + 1) % FAQ_IDS.length
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        targetIndex = (index - 1 + FAQ_IDS.length) % FAQ_IDS.length
      } else if (e.key === 'Home') {
        e.preventDefault()
        targetIndex = 0
      } else if (e.key === 'End') {
        e.preventDefault()
        targetIndex = FAQ_IDS.length - 1
      }

      if (targetIndex !== null) {
        const targetId = FAQ_IDS[targetIndex]!
        document.getElementById(`${targetId}-trigger`)?.focus()
      }
    },
    [],
  )

  return (
    <section id="faq" className={`${shared.section} ${shared.sectionDarker}`}>
      <div className={shared.containerNarrow}>
        <Reveal>
          <div className={shared.sectionHeader}>
            <span className={shared.tagBadge}>{t('sectionTag')}</span>
            <h2 className={shared.sectionTitle}>{t('sectionTitle')}</h2>
            <p className={`${shared.subtitle} ${shared.subtitleCentered}`}>
              {t('sectionSubtitle')}
            </p>
          </div>
        </Reveal>

        <div className={styles.accordion} role="presentation">
          {FAQ_IDS.map((id, index) => {
            const isOpen = openId === id
            const item = items[index]!

            return (
              <Reveal key={id} delay={index * 0.05}>
                <div className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
                  <h3>
                    <button
                      id={`${id}-trigger`}
                      type="button"
                      className={styles.trigger}
                      onClick={() => toggle(id)}
                      onKeyDown={e => handleKeyDown(e, id, index)}
                      aria-expanded={isOpen}
                      aria-controls={`${id}-content`}
                    >
                      <span className={styles.question}>{item.question}</span>
                      <ChevronDown
                        size={18}
                        strokeWidth={2}
                        className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>
                  <div
                    id={`${id}-content`}
                    role="region"
                    aria-labelledby={`${id}-trigger`}
                    className={styles.content}
                    style={
                      {
                        '--content-height': contentRefs.current.get(id)
                          ? `${contentRefs.current.get(id)!.scrollHeight}px`
                          : '0px',
                      } as React.CSSProperties
                    }
                  >
                    <div
                      ref={el => {
                        if (el) contentRefs.current.set(id, el)
                      }}
                      className={styles.answer}
                    >
                      {item.answer}
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
