import type { ServiceMeta } from '@/types'
import {
  HeartPulse, ScanLine, ClipboardCheck, ShieldCheck,
  Cog, Zap, Radio, Factory,
  Server, Globe, BarChart3, Terminal,
} from 'lucide-react'

export const SERVICES_META: ServiceMeta[] = [
  {
    key: 'medical',
    tag: 'MEDICAL_SYS',
    title: 'Medical Systems',
    accent: '#22c55e',
    accentText: '#fff',
    focusIcons: [HeartPulse, ScanLine, ClipboardCheck, ShieldCheck],
  },
  {
    key: 'industrial',
    tag: 'INDUSTRIAL_AUTO',
    title: 'Industrial Systems',
    accent: '#CFA956',
    accentText: 'var(--dark)',
    focusIcons: [Cog, Zap, Radio, Factory],
  },
  {
    key: 'it',
    tag: 'IT_INFRA',
    title: 'IT Infrastructure',
    accent: '#3b82f6',
    accentText: '#fff',
    focusIcons: [Server, Globe, BarChart3, Terminal],
  },
]
