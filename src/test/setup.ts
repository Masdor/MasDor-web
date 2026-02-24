import '@testing-library/jest-dom/vitest'
import '@/i18n'

// Global IntersectionObserver mock
export let intersectionCallback: IntersectionObserverCallback
export let intersectionInstance: IntersectionObserver

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null
  readonly rootMargin: string = ''
  readonly thresholds: ReadonlyArray<number> = []

  constructor(cb: IntersectionObserverCallback, public options?: IntersectionObserverInit) {
    intersectionCallback = cb
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    intersectionInstance = this
  }

  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  takeRecords = vi.fn().mockReturnValue([])
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
