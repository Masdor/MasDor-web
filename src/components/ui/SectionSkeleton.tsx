import styles from './SectionSkeleton.module.css'

interface SectionSkeletonProps {
  rows: number[]
  'aria-label'?: string
}

export function SectionSkeleton({ rows, 'aria-label': ariaLabel }: SectionSkeletonProps) {
  return (
    <div className={styles.skeleton} aria-busy="true" aria-label={ariaLabel}>
      {rows.map((height, i) => (
        <div
          key={i}
          className={styles.row}
          style={{ height }}
        />
      ))}
    </div>
  )
}
