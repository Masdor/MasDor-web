import { useState, useCallback, useRef } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import { ChevronDown } from 'lucide-react'
import { FAQ_ITEMS } from '@/data/faq'
import shared from '@/styles/shared.module.css'
import styles from './Faq.module.css'

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(null)
  const contentRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  const toggle = useCallback((id: string) => {
    setOpenId(prev => (prev === id ? null : id))
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, _id: string, index: number) => {
      let targetIndex: number | null = null

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        targetIndex = (index + 1) % FAQ_ITEMS.length
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        targetIndex = (index - 1 + FAQ_ITEMS.length) % FAQ_ITEMS.length
      } else if (e.key === 'Home') {
        e.preventDefault()
        targetIndex = 0
      } else if (e.key === 'End') {
        e.preventDefault()
        targetIndex = FAQ_ITEMS.length - 1
      }

      if (targetIndex !== null) {
        const targetId = FAQ_ITEMS[targetIndex]!.id
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
            <span className={shared.tagBadge}>FAQ</span>
            <h2 className={shared.sectionTitle}>Häufige Fragen</h2>
            <p className={`${shared.subtitle} ${shared.subtitleCentered}`}>
              Antworten auf die wichtigsten Fragen zu unserer Arbeitsweise und unserem Angebot.
            </p>
          </div>
        </Reveal>

        <div className={styles.accordion} role="presentation">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openId === item.id

            return (
              <Reveal key={item.id} delay={index * 0.05}>
                <div className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
                  <h3>
                    <button
                      id={`${item.id}-trigger`}
                      type="button"
                      className={styles.trigger}
                      onClick={() => toggle(item.id)}
                      onKeyDown={e => handleKeyDown(e, item.id, index)}
                      aria-expanded={isOpen}
                      aria-controls={`${item.id}-content`}
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
                    id={`${item.id}-content`}
                    role="region"
                    aria-labelledby={`${item.id}-trigger`}
                    className={styles.content}
                    style={
                      {
                        '--content-height': contentRefs.current.get(item.id)
                          ? `${contentRefs.current.get(item.id)!.scrollHeight}px`
                          : '0px',
                      } as React.CSSProperties
                    }
                  >
                    <div
                      ref={el => {
                        if (el) contentRefs.current.set(item.id, el)
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
