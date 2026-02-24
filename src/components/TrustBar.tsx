import { useTranslation } from 'react-i18next'
import { Reveal } from '@/components/ui/Reveal'
import styles from './TrustBar.module.css'

export function TrustBar() {
  const { t } = useTranslation('trust')
  const tags = t('tags', { returnObjects: true }) as string[]

  return (
    <Reveal>
      <div className={styles.wrapper}>
        <div className={styles.bar} role="list" aria-label={t('ariaLabel')}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag} role="listitem">{tag}</span>
          ))}
        </div>
      </div>
    </Reveal>
  )
}
