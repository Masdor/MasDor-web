export interface NavLink {
  id: string
  label: string
}

export interface ServiceFocus {
  icon: string
  title: string
  desc: string
}

export interface ServiceData {
  key: string
  tag: string
  title: string
  accent: string
  accentText: string
  shortDesc: string
  subtitle: string
  intro: string
  focus: ServiceFocus[]
  principles: string[]
  audience: string[]
  strengths: string[]
}

export interface ProcessStep {
  num: string
  title: string
  desc: string
  icon: string
}

export interface TeamMember {
  name: string
  role: string
  focus: string
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
