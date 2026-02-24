import { Component, type ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'
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
    if (this.state.hasError) {
      if (this.props.variant === 'section') {
        return (
          <div className={styles.sectionError}>
            <p className={styles.sectionMessage}>
              Inhalte konnten nicht geladen werden.
            </p>
            <button type="button" onClick={() => window.location.reload()} className={`${styles.reload} ${styles.sectionReload}`}>
              Seite neu laden
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
            <h1 className={styles.title}>Etwas ist schiefgelaufen</h1>
            <p className={styles.message}>
              Ein unerwarteter Fehler ist aufgetreten. Bitte laden Sie die Seite neu.
            </p>
            <button type="button" onClick={() => window.location.reload()} className={styles.reload}>
              Seite neu laden
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
