import { useState, useEffect } from 'react'

export function useCounter(end: number, duration = 2000, trigger = false) {
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!trigger) {
      setVal(0)
      return
    }
    let start = 0
    let active = true
    const step = end / (duration / 16)
    const timer = setInterval(() => {
      if (!active) return
      start += step
      if (start >= end) {
        setVal(end)
        clearInterval(timer)
      } else {
        setVal(Math.floor(start))
      }
    }, 16)
    return () => {
      active = false
      clearInterval(timer)
    }
  }, [trigger, end, duration])

  return val
}
