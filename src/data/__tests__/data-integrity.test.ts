import { SERVICES_META } from '@/data/services'
import { PROCESS_STEPS_META } from '@/data/process'
import { PROJECTS_META, CATEGORY_KEYS } from '@/data/projects'
import { FAQ_IDS } from '@/data/faq'
import { NAV_LINKS } from '@/data/navigation'
import { TEAM_MEMBERS, CONTACT_PERSONS, COMPANY_INFO } from '@/data/team'
import { TRUST_TAG_COUNT } from '@/data/trust-tags'

import servicesTranslations from '@/locales/de/services.json'
import processTranslations from '@/locales/de/process.json'
import portfolioTranslations from '@/locales/de/portfolio.json'
import faqTranslations from '@/locales/de/faq.json'
import trustTranslations from '@/locales/de/trust.json'

describe('Data Integrity', () => {
  describe('Services', () => {
    it('has exactly 3 service categories', () => {
      expect(SERVICES_META).toHaveLength(3)
    })

    it('each service has unique key', () => {
      const keys = SERVICES_META.map(s => s.key)
      expect(new Set(keys).size).toBe(keys.length)
    })

    it('each service has 4 focus icons', () => {
      for (const s of SERVICES_META) {
        expect(s.focusIcons).toHaveLength(4)
      }
    })

    it('translation items match meta count', () => {
      expect(servicesTranslations.items).toHaveLength(SERVICES_META.length)
    })

    it('each translation item has non-empty arrays', () => {
      for (const item of servicesTranslations.items) {
        expect(item.focus).toHaveLength(4)
        expect(item.principles.length).toBeGreaterThan(0)
        expect(item.audience.length).toBeGreaterThan(0)
        expect(item.strengths.length).toBeGreaterThan(0)
      }
    })
  })

  describe('Process', () => {
    it('has exactly 5 steps', () => {
      expect(PROCESS_STEPS_META).toHaveLength(5)
    })

    it('steps are numbered 01–05', () => {
      PROCESS_STEPS_META.forEach((step, i) => {
        expect(step.num).toBe(String(i + 1).padStart(2, '0'))
      })
    })

    it('translation items match meta count', () => {
      expect(processTranslations.items).toHaveLength(PROCESS_STEPS_META.length)
    })
  })

  describe('Projects', () => {
    it('has 9 projects', () => {
      expect(PROJECTS_META).toHaveLength(9)
    })

    it('each project has unique id', () => {
      const ids = PROJECTS_META.map(p => p.id)
      expect(new Set(ids).size).toBe(ids.length)
    })

    it('has 3 projects per category', () => {
      const medical = PROJECTS_META.filter(p => p.category === 'medical')
      const industrial = PROJECTS_META.filter(p => p.category === 'industrial')
      const it = PROJECTS_META.filter(p => p.category === 'it')
      expect(medical).toHaveLength(3)
      expect(industrial).toHaveLength(3)
      expect(it).toHaveLength(3)
    })

    it('each project has at least 1 tag', () => {
      for (const p of PROJECTS_META) {
        expect(p.tags.length).toBeGreaterThan(0)
      }
    })

    it('translation items match meta count', () => {
      expect(portfolioTranslations.items).toHaveLength(PROJECTS_META.length)
    })

    it('each translation item has at least 1 metric', () => {
      for (const item of portfolioTranslations.items) {
        expect(item.metrics.length).toBeGreaterThan(0)
      }
    })

    it('all categories have keys defined', () => {
      const categories = [...new Set(PROJECTS_META.map(p => p.category))]
      for (const cat of categories) {
        expect(CATEGORY_KEYS[cat]).toBeDefined()
      }
    })
  })

  describe('FAQ', () => {
    it('has at least 5 items', () => {
      expect(FAQ_IDS.length).toBeGreaterThanOrEqual(5)
    })

    it('each ID is unique', () => {
      expect(new Set(FAQ_IDS).size).toBe(FAQ_IDS.length)
    })

    it('translation items match ID count', () => {
      expect(faqTranslations.items).toHaveLength(FAQ_IDS.length)
    })

    it('each translation item has non-empty question and answer', () => {
      for (const item of faqTranslations.items) {
        expect(item.question.length).toBeGreaterThan(10)
        expect(item.answer.length).toBeGreaterThan(20)
      }
    })
  })

  describe('Navigation', () => {
    it('has 6 links', () => {
      expect(NAV_LINKS).toHaveLength(6)
    })

    it('starts with home', () => {
      expect(NAV_LINKS[0]!.id).toBe('home')
    })

    it('ends with kontakt', () => {
      expect(NAV_LINKS[NAV_LINKS.length - 1]!.id).toBe('kontakt')
    })
  })

  describe('Team & Company', () => {
    it('has team members', () => {
      expect(TEAM_MEMBERS.length).toBeGreaterThanOrEqual(2)
    })

    it('has contact persons', () => {
      expect(CONTACT_PERSONS.length).toBeGreaterThanOrEqual(2)
    })

    it('company info has required fields', () => {
      expect(COMPANY_INFO.name).toBe('LAB-ROOT')
      expect(COMPANY_INFO.email).toContain('@')
      expect(COMPANY_INFO.ustIdNr).toMatch(/^DE\d+$/)
    })
  })

  describe('Trust Tags', () => {
    it('has correct tag count', () => {
      expect(trustTranslations.tags).toHaveLength(TRUST_TAG_COUNT)
    })

    it('each tag is non-empty', () => {
      for (const t of trustTranslations.tags) {
        expect(t.length).toBeGreaterThan(0)
      }
    })
  })
})
