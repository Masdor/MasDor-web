import { useState, useEffect, useRef } from 'react'

type Callback = (isIntersecting: boolean) => void

const observers = new Map<number, IntersectionObserver>()
const callbacks = new Map<Element, Callback>()

function getObserver(threshold: number): IntersectionObserver {
  let obs = observers.get(threshold)
  if (!obs) {
    obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const cb = callbacks.get(entry.target)
          if (cb && entry.isIntersecting) {
            cb(true)
            obs!.unobserve(entry.target)
            callbacks.delete(entry.target)
          }
        }
      },
      { threshold },
    )
    observers.set(threshold, obs)
  }
  return obs
}

function observe(el: Element, threshold: number, cb: Callback) {
  callbacks.set(el, cb)
  getObserver(threshold).observe(el)
}

function unobserve(el: Element, threshold: number) {
  callbacks.delete(el)
  observers.get(threshold)?.unobserve(el)
}

/** @internal — test-only */
export function _resetObservers() {
  observers.clear()
  callbacks.clear()
}

export function useInView(
  threshold = 0.12,
): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    observe(el, threshold, () => setVisible(true))
    return () => unobserve(el, threshold)
  }, [threshold])
  return [ref, visible]
}
