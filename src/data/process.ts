import type { ProcessStep } from '@/types'
import { Crosshair, SearchCode, Wrench, FileCheck, ShieldCheck } from 'lucide-react'

export const PROCESS_STEPS: ProcessStep[] = [
  {
    num: '01',
    title: 'Erfassen',
    desc: 'Technische Lage, Abhängigkeiten und Auswirkungen im Betrieb systematisch aufnehmen.',
    icon: Crosshair,
  },
  {
    num: '02',
    title: 'Analysieren',
    desc: 'Die eigentliche Fehlerursache identifizieren – nicht nur Symptome behandeln.',
    icon: SearchCode,
  },
  {
    num: '03',
    title: 'Umsetzen',
    desc: 'Maßnahmen stabil, nachvollziehbar und praxisnah in den Betrieb integrieren.',
    icon: Wrench,
  },
  {
    num: '04',
    title: 'Dokumentieren',
    desc: 'Arbeitsschritte, Konfigurationen und Änderungen lückenlos festhalten.',
    icon: FileCheck,
  },
  {
    num: '05',
    title: 'Stabilisieren',
    desc: 'Wiederholfehler reduzieren und technische Verlässlichkeit dauerhaft erhöhen.',
    icon: ShieldCheck,
  },
]
