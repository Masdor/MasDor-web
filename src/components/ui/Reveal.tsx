import type { CSSProperties, ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'
import styles from './Reveal.module.css'

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none'

interface RevealProps {
  children: ReactNode
  delay?: number
  direction?: RevealDirection
  style?: CSSProperties
}

export function Reveal({ children, delay = 0, direction = 'up', style: extraStyle }: RevealProps) {
  const [ref, visible] = useInView(0.08)
  const dirClass = styles[`dir-${direction}` as keyof typeof styles] ?? ''
  return (
    <div
      ref={ref}
      className={`${styles.wrapper} ${dirClass} ${visible ? styles.visible : ''}`}
      style={{ '--delay': `${delay}s`, ...extraStyle } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
