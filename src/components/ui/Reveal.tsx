import type { CSSProperties, ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'
import styles from './Reveal.module.css'

interface RevealProps {
  children: ReactNode
  delay?: number
  style?: CSSProperties
}

export function Reveal({ children, delay = 0, style: extraStyle }: RevealProps) {
  const [ref, visible] = useInView(0.08)
  return (
    <div
      ref={ref}
      className={`${styles.wrapper} ${visible ? styles.visible : ''}`}
      style={{ '--delay': `${delay}s`, ...extraStyle } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
