import type { ProcessStep } from '@/types'

export const PROCESS_STEPS: ProcessStep[] = [
  {
    num: '01',
    title: 'Erfassen',
    desc: 'Technische Lage, Abhängigkeiten und Auswirkungen im Betrieb systematisch aufnehmen.',
    icon: '◎',
  },
  {
    num: '02',
    title: 'Analysieren',
    desc: 'Die eigentliche Fehlerursache identifizieren – nicht nur Symptome behandeln.',
    icon: '⟐',
  },
  {
    num: '03',
    title: 'Umsetzen',
    desc: 'Maßnahmen stabil, nachvollziehbar und praxisnah in den Betrieb integrieren.',
    icon: '⬡',
  },
  {
    num: '04',
    title: 'Dokumentieren',
    desc: 'Arbeitsschritte, Konfigurationen und Änderungen lückenlos festhalten.',
    icon: '▣',
  },
  {
    num: '05',
    title: 'Stabilisieren',
    desc: 'Wiederholfehler reduzieren und technische Verlässlichkeit dauerhaft erhöhen.',
    icon: '◈',
  },
]
