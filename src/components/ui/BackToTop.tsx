import { useNavigation } from '@/context/useNavigation'
import styles from './BackToTop.module.css'

export function BackToTop() {
  const { showBackToTop } = useNavigation()

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Nach oben"
      className={`${styles.button} ${showBackToTop ? styles.visible : ''}`}
    >
      ↑
    </button>
  )
}
