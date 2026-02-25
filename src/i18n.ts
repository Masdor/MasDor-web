import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Only bundle above-fold German translations (common + hero).
// All other namespaces and languages are fetched at runtime from /locales/.
import commonDe from '@/locales/de/common.json'
import heroDe from '@/locales/de/hero.json'

/** Minimal i18next backend that fetches locale JSON from /locales/{lng}/{ns}.json */
const LazyBackend = {
  type: 'backend' as const,
  init() {},
  read(language: string, namespace: string, callback: (err: Error | null, data?: object) => void) {
    fetch(`/locales/${language}/${namespace}.json`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(data => callback(null, data))
      .catch(err => callback(err))
  },
}

const savedLang = (() => {
  try { return localStorage.getItem('lab-root-lang') } catch { return null }
})()

i18n
  .use(LazyBackend)
  .use(initReactI18next)
  .init({
    resources: {
      de: { common: commonDe, hero: heroDe },
    },
    lng: savedLang || 'de',
    fallbackLng: 'de',
    defaultNS: 'common',
    ns: ['common', 'hero'],
    partialBundledLanguages: true,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  })

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng
  try { localStorage.setItem('lab-root-lang', lng) } catch { /* ignore */ }
})

document.documentElement.lang = i18n.language

export default i18n
