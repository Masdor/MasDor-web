export interface NavLink {
  id: string
  labelKey: string
}

import type { LucideIcon } from 'lucide-react'

export interface ServiceMeta {
  key: string
  tag: string
  title: string
  accent: string
  accentText: string
  focusIcons: LucideIcon[]
}

export interface ProcessStepMeta {
  num: string
  icon: LucideIcon
}

export interface TeamMember {
  name: string
  role: string
  focusIndex: number
  initials: string
}

export interface ContactInfo {
  name: string
  role: string
  tel: string[]
}

export interface ContactFormData {
  name: string
  email: string
  telefon: string
  betreff: string
  nachricht: string
}

export interface FormErrors {
  name?: string
  email?: string
  nachricht?: string
}

export type ProjectCategory = 'medical' | 'industrial' | 'it'

export interface ProjectMeta {
  id: string
  category: ProjectCategory
  tags: string[]
  icon: LucideIcon
  index: number
}
