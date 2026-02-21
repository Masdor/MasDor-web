import type { TeamMember, ContactInfo } from '@/types'

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Mahmoud Baddour, M.Eng.',
    role: 'Founder & Owner',
    focus: 'Medical & Industrial Engineering',
    initials: 'MB',
  },
  {
    name: 'Moustafa Almasri',
    role: 'CTO & Lead Systems Engineer',
    focus: 'IT Infrastructure & Automation',
    initials: 'MA',
  },
]

export const CONTACT_PERSONS: ContactInfo[] = [
  { name: 'Mahmoud Baddour, M.Eng.', role: 'Founder', tel: '+49 177 538 9347' },
  { name: 'Moustafa Almasri', role: 'CTO', tel: '+49 163 137 1376' },
]

export const COMPANY_INFO = {
  name: 'LAB-ROOT',
  legalName: 'Root Trading',
  street: 'Steinweg 6',
  city: '93413 Cham',
  country: 'Deutschland',
  email: 'info@lab-root.com',
  ustIdNr: 'DE367983356',
  stNr: '211/202/10138',
} as const
