import { useState, type CSSProperties, type ReactNode } from 'react'
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
  const [hov, setHov] = useState(false)
  return (
    <div
      className={`${styles.card} ${className || ''}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        ...style,
        borderColor: hov ? accentColor + '44' : 'var(--card-border)',
        transform: hov ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hov && glowOnHover ? `0 8px 40px ${accentColor}11` : 'none',
      }}
    >
      {children}
    </div>
  )
}
