import { useEffect } from 'react'

interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number
  duration: number
}

interface LayoutShiftEntry extends PerformanceEntry {
  hadRecentInput: boolean
  value: number
}

export interface WebVitalMetric {
  name: 'LCP' | 'FID' | 'CLS' | 'TTFB' | 'FCP' | 'INP'
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
}

type ReportCallback = (metric: WebVitalMetric) => void

const thresholds: Record<string, [number, number]> = {
  LCP:  [2500, 4000],
  FID:  [100, 300],
  CLS:  [0.1, 0.25],
  TTFB: [800, 1800],
  FCP:  [1800, 3000],
  INP:  [200, 500],
}

function rate(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const t = thresholds[name]
  if (!t) return 'good'
  const [good, poor] = t
  if (value <= good) return 'good'
  if (value <= poor) return 'needs-improvement'
  return 'poor'
}

function observeLCP(report: ReportCallback) {
  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const last = entries[entries.length - 1]
      if (last) {
        const value = last.startTime
        report({ name: 'LCP', value, rating: rate('LCP', value) })
      }
    })
    observer.observe({ type: 'largest-contentful-paint', buffered: true })
  } catch { /* Browser doesn't support this observer */ }
}

function observeFID(report: ReportCallback) {
  try {
    const observer = new PerformanceObserver((list) => {
      const entry = list.getEntries()[0] as PerformanceEventTiming | undefined
      if (entry) {
        const value = entry.processingStart - entry.startTime
        report({ name: 'FID', value, rating: rate('FID', value) })
      }
    })
    observer.observe({ type: 'first-input', buffered: true })
  } catch { /* unsupported */ }
}

function observeCLS(report: ReportCallback) {
  try {
    let clsValue = 0
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as LayoutShiftEntry).hadRecentInput) {
          clsValue += (entry as LayoutShiftEntry).value
        }
      }
    })
    observer.observe({ type: 'layout-shift', buffered: true })
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        report({ name: 'CLS', value: clsValue, rating: rate('CLS', clsValue) })
        observer.disconnect()
      }
    }, { once: true })
  } catch { /* unsupported */ }
}

function observeTTFB(report: ReportCallback) {
  try {
    const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
    if (nav) {
      const value = nav.responseStart - nav.requestStart
      report({ name: 'TTFB', value, rating: rate('TTFB', value) })
    }
  } catch { /* unsupported */ }
}

function observeFCP(report: ReportCallback) {
  try {
    const observer = new PerformanceObserver((list) => {
      const entry = list.getEntries().find(e => e.name === 'first-contentful-paint')
      if (entry) {
        report({ name: 'FCP', value: entry.startTime, rating: rate('FCP', entry.startTime) })
      }
    })
    observer.observe({ type: 'paint', buffered: true })
  } catch { /* unsupported */ }
}

function observeINP(report: ReportCallback) {
  try {
    let maxDuration = 0
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const duration = (entry as PerformanceEventTiming).duration
        if (duration > maxDuration) {
          maxDuration = duration
        }
      }
    })
    observer.observe({ type: 'event', buffered: true })
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden' && maxDuration > 0) {
        report({ name: 'INP', value: maxDuration, rating: rate('INP', maxDuration) })
        observer.disconnect()
      }
    }, { once: true })
  } catch { /* unsupported */ }
}

/**
 * Measures Core Web Vitals using native PerformanceObserver API.
 * Reports each metric once via the callback.
 * No external dependencies required.
 */
export function useWebVitals(onReport: ReportCallback) {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof PerformanceObserver === 'undefined') return

    observeLCP(onReport)
    observeFID(onReport)
    observeCLS(onReport)
    observeTTFB(onReport)
    observeFCP(onReport)
    observeINP(onReport)
  }, [onReport])
}
