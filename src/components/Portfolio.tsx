import { useState, useCallback, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Reveal } from '@/components/ui/Reveal'
import { HoverCard } from '@/components/ui/HoverCard'
import { Icon } from '@/components/ui/Icon'
import { PROJECTS_META, CATEGORY_KEYS } from '@/data/projects'
import type { ProjectCategory } from '@/types'
import { X } from 'lucide-react'
import shared from '@/styles/shared.module.css'
import styles from './Portfolio.module.css'

type FilterKey = 'all' | ProjectCategory
const FILTER_KEYS: FilterKey[] = ['all', 'medical', 'industrial', 'it']

export function Portfolio() {
  const { t } = useTranslation('portfolio')
  const [filter, setFilter] = useState<FilterKey>('all')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  const filtered = filter === 'all' ? PROJECTS_META : PROJECTS_META.filter(p => p.category === filter)
  const items = t('items', { returnObjects: true }) as Array<{
    title: string
    client: string
    summary: string
    description: string
    metrics: Array<{ label: string; value: string }>
  }>

  const openDetail = useCallback((projectIndex: number) => {
    triggerRef.current = document.activeElement as HTMLElement
    setSelectedIndex(projectIndex)
    document.body.classList.add('modal-open')
  }, [])

  const closeDetail = useCallback(() => {
    setSelectedIndex(null)
    document.body.classList.remove('modal-open')
    requestAnimationFrame(() => {
      triggerRef.current?.focus()
      triggerRef.current = null
    })
  }, [])

  useEffect(() => {
    if (selectedIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDetail()
        return
      }
      if (e.key === 'Tab') {
        const modal = modalRef.current
        if (!modal) return
        const focusable = modal.querySelectorAll<HTMLElement>(
          'button, a[href], [tabindex]:not([tabindex="-1"])'
        )
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last?.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first?.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    const timer = setTimeout(() => {
      modalRef.current?.querySelector<HTMLElement>('button')?.focus()
    }, 100)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      clearTimeout(timer)
    }
  }, [selectedIndex, closeDetail])

  const categoryColor = (cat: ProjectCategory) => {
    return CATEGORY_KEYS[cat]?.color ?? 'var(--gold)'
  }

  const selectedProject = selectedIndex !== null ? PROJECTS_META[selectedIndex] : null
  const selectedText = selectedIndex !== null ? items[selectedIndex] : null

  return (
    <section id="referenzen" className={`${shared.section} ${shared.sectionDark}`}>
      <div className={shared.container}>
        <Reveal>
          <div className={shared.sectionHeader}>
            <span className={shared.tagBadge}>{t('sectionTag')}</span>
            <h2 className={shared.sectionTitle}>{t('sectionTitle')}</h2>
            <p className={`${shared.subtitle} ${shared.subtitleCentered}`}>
              {t('sectionSubtitle')}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className={styles.filters} role="toolbar" aria-label={t('filterLabel')}>
            {FILTER_KEYS.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={`${styles.filterBtn} ${filter === key ? styles.filterActive : ''}`}
                style={{ '--accent': CATEGORY_KEYS[key]!.color } as React.CSSProperties}
                aria-pressed={filter === key}
              >
                {t(`categories.${key}`)}
              </button>
            ))}
          </div>
        </Reveal>

        <div className={styles.grid} role="list">
          {filtered.map((project, i) => {
            const projText = items[project.index]!
            return (
              <Reveal key={project.id} delay={i * 0.06} direction="up">
                <div role="listitem">
                  <HoverCard
                    glowOnHover
                    accentColor={categoryColor(project.category)}
                    className={`${shared.cardDark} ${styles.card}`}
                  >
                    <button
                      type="button"
                      className={styles.cardButton}
                      onClick={() => openDetail(project.index)}
                      aria-label={t('detailLabel', { title: projText.title })}
                    >
                      <div className={styles.cardHeader}>
                        <div
                          className={styles.cardIcon}
                          style={{ '--accent': categoryColor(project.category) } as React.CSSProperties}
                        >
                          <Icon icon={project.icon} size={24} />
                        </div>
                        <span
                          className={styles.categoryBadge}
                          style={{ '--accent': categoryColor(project.category) } as React.CSSProperties}
                        >
                          {t(`categories.${project.category}`)}
                        </span>
                      </div>

                      <h3 className={styles.cardTitle}>{projText.title}</h3>
                      <p className={styles.cardClient}>{projText.client}</p>
                      <p className={styles.cardSummary}>{projText.summary}</p>

                      <div className={styles.metrics}>
                        {projText.metrics.map((m) => (
                          <div key={m.label} className={styles.metric}>
                            <span className={styles.metricValue}>{m.value}</span>
                            <span className={styles.metricLabel}>{m.label}</span>
                          </div>
                        ))}
                      </div>

                      <div className={styles.tags}>
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className={styles.tag}>{tag}</span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className={styles.tag}>+{project.tags.length - 3}</span>
                        )}
                      </div>
                    </button>
                  </HoverCard>
                </div>
              </Reveal>
            )
          })}
        </div>

        {selectedProject && selectedText && (
          <div
            className={styles.overlay}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) closeDetail()
            }}
            aria-label={t('closeDialogLabel')}
            role="presentation"
          >
            <div
              ref={modalRef}
              className={styles.modal}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-title"
            >
              <button
                type="button"
                className={styles.closeBtn}
                onClick={closeDetail}
                aria-label={t('closeLabel')}
              >
                <X size={20} strokeWidth={2} />
              </button>

              <div
                className={styles.modalHeader}
                style={{ '--accent': categoryColor(selectedProject.category) } as React.CSSProperties}
              >
                <div className={styles.modalIcon}>
                  <Icon icon={selectedProject.icon} size={28} />
                </div>
                <div>
                  <span className={styles.modalCategory}>
                    {t(`categories.${selectedProject.category}`)}
                  </span>
                  <h2 id="project-title" className={styles.modalTitle}>
                    {selectedText.title}
                  </h2>
                  <p className={styles.modalClient}>{selectedText.client}</p>
                </div>
              </div>

              <p className={styles.modalDesc}>{selectedText.description}</p>

              <div className={styles.modalMetrics}>
                {selectedText.metrics.map((m) => (
                  <div key={m.label} className={styles.modalMetric}>
                    <span className={styles.modalMetricValue}>{m.value}</span>
                    <span className={styles.modalMetricLabel}>{m.label}</span>
                  </div>
                ))}
              </div>

              <div className={styles.modalTags}>
                {selectedProject.tags.map((tag) => (
                  <span key={tag} className={styles.modalTag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
