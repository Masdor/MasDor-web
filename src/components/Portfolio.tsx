import { useState, useCallback, useRef, useEffect } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import { HoverCard } from '@/components/ui/HoverCard'
import { Icon } from '@/components/ui/Icon'
import { PROJECTS, CATEGORY_LABELS } from '@/data/projects'
import type { Project, ProjectCategory } from '@/types'
import { X } from 'lucide-react'
import shared from '@/styles/shared.module.css'
import styles from './Portfolio.module.css'

type FilterKey = 'all' | ProjectCategory

export function Portfolio() {
  const [filter, setFilter] = useState<FilterKey>('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter)

  const openDetail = useCallback((project: Project) => {
    triggerRef.current = document.activeElement as HTMLElement
    setSelectedProject(project)
    document.body.classList.add('modal-open')
  }, [])

  const closeDetail = useCallback(() => {
    setSelectedProject(null)
    document.body.classList.remove('modal-open')
    requestAnimationFrame(() => {
      triggerRef.current?.focus()
      triggerRef.current = null
    })
  }, [])

  // Modal keyboard handling
  useEffect(() => {
    if (!selectedProject) return

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

    // Focus close button on open
    const timer = setTimeout(() => {
      modalRef.current?.querySelector<HTMLElement>('button')?.focus()
    }, 100)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      clearTimeout(timer)
    }
  }, [selectedProject, closeDetail])

  const categoryColor = (cat: ProjectCategory) => {
    return CATEGORY_LABELS[cat]?.color ?? 'var(--gold)'
  }

  return (
    <section id="referenzen" className={`${shared.section} ${shared.sectionDark}`}>
      <div className={shared.container}>
        <Reveal>
          <div className={shared.sectionHeader}>
            <span className={shared.tagBadge}>REFERENZEN</span>
            <h2 className={shared.sectionTitle}>Projekte. Ergebnisse. Vertrauen.</h2>
            <p className={`${shared.subtitle} ${shared.subtitleCentered}`}>
              Ausgewählte Projekte aus Medical, Industrial und IT — jedes mit messbarem Ergebnis.
            </p>
          </div>
        </Reveal>

        {/* Filter Tabs */}
        <Reveal delay={0.08}>
          <div className={styles.filters} role="toolbar" aria-label="Projekte filtern">
            {(Object.keys(CATEGORY_LABELS) as FilterKey[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={`${styles.filterBtn} ${filter === key ? styles.filterActive : ''}`}
                style={{ '--accent': CATEGORY_LABELS[key]!.color } as React.CSSProperties}
                aria-pressed={filter === key}
              >
                {CATEGORY_LABELS[key]!.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Project Grid */}
        <div className={styles.grid} role="list">
          {filtered.map((project, i) => (
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
                    onClick={() => openDetail(project)}
                    aria-label={`Projekt: ${project.title} — Details anzeigen`}
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
                        {CATEGORY_LABELS[project.category]!.label}
                      </span>
                    </div>

                    <h3 className={styles.cardTitle}>{project.title}</h3>
                    <p className={styles.cardClient}>{project.client}</p>
                    <p className={styles.cardSummary}>{project.summary}</p>

                    <div className={styles.metrics}>
                      {project.metrics.map((m) => (
                        <div key={m.label} className={styles.metric}>
                          <span className={styles.metricValue}>{m.value}</span>
                          <span className={styles.metricLabel}>{m.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className={styles.tags}>
                      {project.tags.slice(0, 3).map((t) => (
                        <span key={t} className={styles.tag}>{t}</span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className={styles.tag}>+{project.tags.length - 3}</span>
                      )}
                    </div>
                  </button>
                </HoverCard>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Detail Modal */}
        {selectedProject && (
          <div
            className={styles.overlay}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) closeDetail()
            }}
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
                aria-label="Schließen"
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
                    {CATEGORY_LABELS[selectedProject.category]!.label}
                  </span>
                  <h2 id="project-title" className={styles.modalTitle}>
                    {selectedProject.title}
                  </h2>
                  <p className={styles.modalClient}>{selectedProject.client}</p>
                </div>
              </div>

              <p className={styles.modalDesc}>{selectedProject.description}</p>

              <div className={styles.modalMetrics}>
                {selectedProject.metrics.map((m) => (
                  <div key={m.label} className={styles.modalMetric}>
                    <span className={styles.modalMetricValue}>{m.value}</span>
                    <span className={styles.modalMetricLabel}>{m.label}</span>
                  </div>
                ))}
              </div>

              <div className={styles.modalTags}>
                {selectedProject.tags.map((t) => (
                  <span key={t} className={styles.modalTag}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
