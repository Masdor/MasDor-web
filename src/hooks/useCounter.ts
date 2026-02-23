import { useState, useEffect } from 'react'

export function useCounter(end: number, duration = 2000, trigger = false) {
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!trigger) {
      setVal(0)
      return
    }

    let startTime: number | null = null
    let rafId: number

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = progress * (2 - progress)
      setVal(Math.floor(eased * end))
      if (progress < 1) {
        rafId = requestAnimationFrame(step)
      }
    }

    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [trigger, end, duration])

  return val
}
