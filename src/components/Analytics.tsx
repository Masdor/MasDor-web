import { useCallback } from 'react'
import { useWebVitals } from '@/hooks/useWebVitals'
import type { WebVitalMetric } from '@/hooks/useWebVitals'

declare global {
  interface Window {
    umami?: {
      track: (eventName: string, data?: Record<string, string | number>) => void
    }
  }
}

export function Analytics() {
  const reportVital = useCallback((metric: WebVitalMetric) => {
    if (import.meta.env.DEV) {
      const icon = metric.rating === 'good' ? '\u{1F7E2}' : metric.rating === 'needs-improvement' ? '\u{1F7E1}' : '\u{1F534}'
      console.log(`${icon} ${metric.name}: ${metric.value.toFixed(metric.name === 'CLS' ? 4 : 0)} (${metric.rating})`)
    }

    if (window.umami) {
      window.umami.track(`web-vital-${metric.name}`, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        rating: metric.rating,
      })
    }
  }, [])

  useWebVitals(reportVital)

  return null
}
