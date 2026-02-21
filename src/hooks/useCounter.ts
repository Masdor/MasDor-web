import { useState, useEffect } from 'react'

export function useCounter(end: number, duration = 2000, trigger = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!trigger) return
    let start = 0
    const step = end / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= end) {
        setVal(end)
        clearInterval(timer)
      } else {
        setVal(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [trigger, end, duration])
  return val
}
