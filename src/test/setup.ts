import '@testing-library/jest-dom/vitest'
import i18n from 'i18next'
import '@/i18n'

// In test environment the fetch backend cannot reach /locales/*.json,
// so we load ALL locale bundles eagerly via Vite's import.meta.glob.
const deModules = import.meta.glob<{ default: Record<string, unknown> }>('@/locales/de/*.json', { eager: true })
const enModules = import.meta.glob<{ default: Record<string, unknown> }>('@/locales/en/*.json', { eager: true })

for (const [path, mod] of Object.entries(deModules)) {
  const ns = path.split('/').pop()?.replace('.json', '') ?? ''
  i18n.addResourceBundle('de', ns, mod.default, true, true)
}
for (const [path, mod] of Object.entries(enModules)) {
  const ns = path.split('/').pop()?.replace('.json', '') ?? ''
  i18n.addResourceBundle('en', ns, mod.default, true, true)
}

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
