import { SERVICES } from '@/data/services'
import { PROCESS_STEPS } from '@/data/process'
import { PROJECTS, CATEGORY_LABELS } from '@/data/projects'
import { FAQ_ITEMS } from '@/data/faq'
import { NAV_LINKS } from '@/data/navigation'
import { TEAM_MEMBERS, CONTACT_PERSONS, COMPANY_INFO } from '@/data/team'
import { TRUST_TAGS } from '@/data/trust-tags'

describe('Data Integrity', () => {
  describe('Services', () => {
    it('has exactly 3 service categories', () => {
      expect(SERVICES).toHaveLength(3)
    })

    it('each service has unique key', () => {
      const keys = SERVICES.map(s => s.key)
      expect(new Set(keys).size).toBe(keys.length)
    })

    it('each service has 4 focus items', () => {
      for (const s of SERVICES) {
        expect(s.focus).toHaveLength(4)
      }
    })

    it('each service has non-empty arrays', () => {
      for (const s of SERVICES) {
        expect(s.principles.length).toBeGreaterThan(0)
        expect(s.audience.length).toBeGreaterThan(0)
        expect(s.strengths.length).toBeGreaterThan(0)
      }
    })
  })

  describe('Process', () => {
    it('has exactly 5 steps', () => {
      expect(PROCESS_STEPS).toHaveLength(5)
    })

    it('steps are numbered 01–05', () => {
      PROCESS_STEPS.forEach((step, i) => {
        expect(step.num).toBe(String(i + 1).padStart(2, '0'))
      })
    })
  })

  describe('Projects', () => {
    it('has 9 projects', () => {
      expect(PROJECTS).toHaveLength(9)
    })

    it('each project has unique id', () => {
      const ids = PROJECTS.map(p => p.id)
      expect(new Set(ids).size).toBe(ids.length)
    })

    it('has 3 projects per category', () => {
      const medical = PROJECTS.filter(p => p.category === 'medical')
      const industrial = PROJECTS.filter(p => p.category === 'industrial')
      const it = PROJECTS.filter(p => p.category === 'it')
      expect(medical).toHaveLength(3)
      expect(industrial).toHaveLength(3)
      expect(it).toHaveLength(3)
    })

    it('each project has at least 1 metric and 1 tag', () => {
      for (const p of PROJECTS) {
        expect(p.metrics.length).toBeGreaterThan(0)
        expect(p.tags.length).toBeGreaterThan(0)
      }
    })

    it('all categories have labels', () => {
      const categories = [...new Set(PROJECTS.map(p => p.category))]
      for (const cat of categories) {
        expect(CATEGORY_LABELS[cat]).toBeDefined()
      }
    })
  })

  describe('FAQ', () => {
    it('has at least 5 items', () => {
      expect(FAQ_ITEMS.length).toBeGreaterThanOrEqual(5)
    })

    it('each item has unique id', () => {
      const ids = FAQ_ITEMS.map(f => f.id)
      expect(new Set(ids).size).toBe(ids.length)
    })

    it('each item has non-empty question and answer', () => {
      for (const f of FAQ_ITEMS) {
        expect(f.question.length).toBeGreaterThan(10)
        expect(f.answer.length).toBeGreaterThan(20)
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
    it('has tags', () => {
      expect(TRUST_TAGS.length).toBeGreaterThanOrEqual(5)
    })

    it('each tag is non-empty', () => {
      for (const t of TRUST_TAGS) {
        expect(t.length).toBeGreaterThan(0)
      }
    })
  })
})
