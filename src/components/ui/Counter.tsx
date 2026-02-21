import { useCounter } from '@/hooks/useCounter'

interface CounterProps {
  end: number
  suffix?: string
  trigger: boolean
}

export function Counter({ end, suffix = '', trigger }: CounterProps) {
  const val = useCounter(end, 1800, trigger)
  return (
    <span>
      {val}
      {suffix}
    </span>
  )
}
