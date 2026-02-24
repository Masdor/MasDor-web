import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { COMPANY_INFO } from '@/data/team'
import styles from './Legal.module.css'

interface LegalProps {
  page: 'impressum' | 'datenschutz' | null
  onClose: () => void
}

export function Legal({ page, onClose }: LegalProps) {
  const { t } = useTranslation('legal')
  const modalRef = useRef<HTMLDivElement>(null)
  const mouseDownTargetRef = useRef<EventTarget | null>(null)

  useEffect(() => {
    if (!page) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key === 'Tab') {
        const modal = modalRef.current
        if (!modal) return
        const focusable = modal.querySelectorAll<HTMLElement>(
          'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
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

    const closeBtn = modalRef.current?.querySelector<HTMLElement>('button')
    closeBtn?.focus()

    document.body.classList.add('modal-open')

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('modal-open')
    }
  }, [page, onClose])

  if (!page) return null

  const titleId = `legal-title-${page}`

  return (
    <div
      className={styles.overlay}
      onMouseDown={e => { mouseDownTargetRef.current = e.target }}
      onClick={e => { if (e.target === e.currentTarget && mouseDownTargetRef.current === e.currentTarget) onClose() }}
    >
      <div
        ref={modalRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button type="button" className={styles.close} onClick={onClose} aria-label={t('closeLabel')}>×</button>

        {page === 'impressum' ? (
          <>
            <h2 id={titleId} className={styles.title}>{t('impressum.title')}</h2>
            <div className={styles.content}>
              <h3>{t('impressum.tmg')}</h3>
              <p>
                {COMPANY_INFO.legalName}<br />
                {COMPANY_INFO.street}<br />
                {COMPANY_INFO.city}<br />
                {COMPANY_INFO.country}
              </p>

              <h3>{t('impressum.contact')}</h3>
              <p>{t('impressum.email')}: {COMPANY_INFO.email}</p>

              <h3>{t('impressum.vatTitle')}</h3>
              <p>
                {t('impressum.vatDesc')}<br />
                {COMPANY_INFO.ustIdNr}
              </p>
              <p>{t('impressum.taxNumber')}: {COMPANY_INFO.stNr}</p>

              <h3>{t('impressum.responsible')}</h3>
              <p>
                Mahmoud Baddour, M.Eng.<br />
                {COMPANY_INFO.street}<br />
                {COMPANY_INFO.city}
              </p>

              <h3>{t('impressum.disclaimer')}</h3>
              <p>
                {t('impressum.disclaimerText')}
              </p>
            </div>
          </>
        ) : (
          <>
            <h2 id={titleId} className={styles.title}>{t('datenschutz.title')}</h2>
            <div className={styles.content}>
              <h3>{t('datenschutz.s1Title')}</h3>
              <p>
                {COMPANY_INFO.legalName}<br />
                {COMPANY_INFO.street}<br />
                {COMPANY_INFO.city}<br />
                {t('impressum.email')}: {COMPANY_INFO.email}
              </p>

              <h3>{t('datenschutz.s2Title')}</h3>
              <p>{t('datenschutz.s2Text')}</p>

              <h3>{t('datenschutz.s3Title')}</h3>
              <p>{t('datenschutz.s3Text')}</p>

              <h3>{t('datenschutz.s4Title')}</h3>
              <p>{t('datenschutz.s4Text')}</p>

              <h3>{t('datenschutz.s5Title')}</h3>
              <p>
                {t('datenschutz.s5Text')} {COMPANY_INFO.email}
              </p>

              <p className={styles.disclaimer}>
                {t('datenschutz.disclaimer')}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
