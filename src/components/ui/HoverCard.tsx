import { useState, type CSSProperties, type ReactNode } from 'react'
import { GOLD, CARD_BORDER } from '@/styles/tokens'
import styles from './HoverCard.module.css'

interface HoverCardProps {
  children: ReactNode
  style?: CSSProperties
  accentColor?: string
  glowOnHover?: boolean
}

export function HoverCard({
  children,
  style,
  accentColor = GOLD,
  glowOnHover = false,
}: HoverCardProps) {
  const [hov, setHov] = useState(false)
  return (
    <div
      className={styles.card}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        ...style,
        borderColor: hov ? accentColor + '44' : CARD_BORDER,
        transform: hov ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hov && glowOnHover ? `0 8px 40px ${accentColor}11` : 'none',
      }}
    >
      {children}
    </div>
  )
}
