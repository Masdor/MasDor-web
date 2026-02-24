import type { ProjectMeta, ProjectCategory } from '@/types'
import {
  HeartPulse, ScanLine, Microscope,
  Cog, Gauge, CircuitBoard,
  Server, Shield, Network,
} from 'lucide-react'

export const PROJECTS_META: ProjectMeta[] = [
  // ─── Medical ───
  { id: 'med-ultrasound', category: 'medical', tags: ['GE Healthcare', 'Idunn', 'TXPS', 'IEC 62353'], icon: ScanLine, index: 0 },
  { id: 'med-labor', category: 'medical', tags: ['Laboranalytik', 'Kalibrierung', 'MPBetreibV'], icon: Microscope, index: 1 },
  { id: 'med-monitoring', category: 'medical', tags: ['Netzwerk', 'Monitoring', 'ISO 13485'], icon: HeartPulse, index: 2 },
  // ─── Industrial ───
  { id: 'ind-sps', category: 'industrial', tags: ['TIA Portal', 'PROFINET', 'S7-1500', 'HMI'], icon: Cog, index: 3 },
  { id: 'ind-schaltschrank', category: 'industrial', tags: ['EPLAN', 'Safety', 'EN 60204-1', 'F-CPU'], icon: CircuitBoard, index: 4 },
  { id: 'ind-retrofit', category: 'industrial', tags: ['Frequenzumrichter', 'PROFINET', 'Energieeffizienz'], icon: Gauge, index: 5 },
  // ─── IT ───
  { id: 'it-mcp', category: 'it', tags: ['Docker', 'Grafana', 'Zabbix', 'Keycloak', 'Nginx'], icon: Server, index: 6 },
  { id: 'it-security', category: 'it', tags: ['VLAN', 'Firewall', 'Zabbix', 'SNMP'], icon: Shield, index: 7 },
  { id: 'it-webinfra', category: 'it', tags: ['Shopware', 'PHP-FPM', 'Nginx', 'OPcache'], icon: Network, index: 8 },
]

export const CATEGORY_KEYS: Record<string, { color: string }> = {
  all: { color: 'var(--gold)' },
  medical: { color: 'var(--color-medical)' },
  industrial: { color: 'var(--gold)' },
  it: { color: 'var(--color-it)' },
}

export type FilterKey = 'all' | ProjectCategory
