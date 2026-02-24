import { Component, type ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'
import i18n from '@/i18n'
import styles from './ErrorBoundary.module.css'

interface Props {
  children: ReactNode
  variant?: 'page' | 'section'
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  render() {
    const t = i18n.t.bind(i18n)

    if (this.state.hasError) {
      if (this.props.variant === 'section') {
        return (
          <div className={styles.sectionError}>
            <p className={styles.sectionMessage}>
              {t('error.sectionMessage')}
            </p>
            <button type="button" onClick={() => window.location.reload()} className={`${styles.reload} ${styles.sectionReload}`}>
              {t('error.reload')}
            </button>
          </div>
        )
      }
      return (
        <div className={styles.container}>
          <div className={styles.inner}>
            <div className={styles.icon}>
              <AlertTriangle size={48} strokeWidth={1.5} />
            </div>
            <h1 className={styles.title}>{t('error.title')}</h1>
            <p className={styles.message}>
              {t('error.message')}
            </p>
            <button type="button" onClick={() => window.location.reload()} className={styles.reload}>
              {t('error.reload')}
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
