import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import commonDe from '@/locales/de/common.json'
import heroDe from '@/locales/de/hero.json'
import servicesDe from '@/locales/de/services.json'
import processDe from '@/locales/de/process.json'
import aboutDe from '@/locales/de/about.json'
import portfolioDe from '@/locales/de/portfolio.json'
import faqDe from '@/locales/de/faq.json'
import contactDe from '@/locales/de/contact.json'
import legalDe from '@/locales/de/legal.json'
import trustDe from '@/locales/de/trust.json'

import commonEn from '@/locales/en/common.json'
import heroEn from '@/locales/en/hero.json'
import servicesEn from '@/locales/en/services.json'
import processEn from '@/locales/en/process.json'
import aboutEn from '@/locales/en/about.json'
import portfolioEn from '@/locales/en/portfolio.json'
import faqEn from '@/locales/en/faq.json'
import contactEn from '@/locales/en/contact.json'
import legalEn from '@/locales/en/legal.json'
import trustEn from '@/locales/en/trust.json'

const savedLang = (() => {
  try { return localStorage.getItem('lab-root-lang') } catch { return null }
})()

i18n.use(initReactI18next).init({
  resources: {
    de: {
      common: commonDe, hero: heroDe, services: servicesDe,
      process: processDe, about: aboutDe, portfolio: portfolioDe,
      faq: faqDe, contact: contactDe, legal: legalDe, trust: trustDe,
    },
    en: {
      common: commonEn, hero: heroEn, services: servicesEn,
      process: processEn, about: aboutEn, portfolio: portfolioEn,
      faq: faqEn, contact: contactEn, legal: legalEn, trust: trustEn,
    },
  },
  lng: savedLang || 'de',
  fallbackLng: 'de',
  defaultNS: 'common',
  ns: ['common', 'hero', 'services', 'process', 'about', 'portfolio', 'faq', 'contact', 'legal', 'trust'],
  interpolation: { escapeValue: false },
})

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng
  try { localStorage.setItem('lab-root-lang', lng) } catch { /* ignore */ }
})

document.documentElement.lang = i18n.language

export default i18n
