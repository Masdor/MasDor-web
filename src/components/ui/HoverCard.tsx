import type { CSSProperties, ReactNode } from 'react'
import styles from './HoverCard.module.css'

interface HoverCardProps {
  children: ReactNode
  style?: CSSProperties
  className?: string
  accentColor?: string
  glowOnHover?: boolean
}

export function HoverCard({
  children,
  style,
  className,
  accentColor = 'var(--gold)',
  glowOnHover = false,
}: HoverCardProps) {
  return (
    <div
      className={`${styles.card} ${glowOnHover ? styles.cardGlow : ''} ${className || ''}`}
      style={{ '--accent': accentColor, ...style } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
