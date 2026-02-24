import type { LucideIcon } from 'lucide-react'
import type { CSSProperties } from 'react'

interface IconProps {
  icon: LucideIcon
  size?: number
  color?: string
  strokeWidth?: number
  className?: string
  style?: CSSProperties
  'aria-hidden'?: boolean
}

export function Icon({
  icon: LucideIconComponent,
  size = 22,
  color = 'currentColor',
  strokeWidth = 1.75,
  className,
  style,
  'aria-hidden': ariaHidden = true,
}: IconProps) {
  return (
    <LucideIconComponent
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
      style={style}
      aria-hidden={ariaHidden}
    />
  )
}
