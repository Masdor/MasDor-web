import type { ServiceData } from '@/types'
import { GOLD } from '@/styles/tokens'

export const SERVICES: ServiceData[] = [
  {
    key: 'medical',
    tag: 'MEDICAL_SYS',
    title: 'Medical Systems',
    accent: '#22c55e',
    shortDesc:
      'Technische Betreuung medizinischer und medizinnaher Systeme – Laboranalytik, bildgebende Systeme, Steuerungseinheiten.',
    subtitle: 'Technische Unterstützung für stabile medizinische Betriebsumgebungen',
    intro:
      'In sensiblen Umgebungen zählt nicht nur, dass ein System wieder läuft – sondern dass die Lösung sauber, dokumentiert und betriebssicher umgesetzt wird. LAB-ROOT arbeitet mit dem Verständnis für regulatorische Anforderungen und hohe Verfügbarkeit.',
    focus: [
      {
        icon: '⚕',
        title: 'Diagnostik & Laboranalytik',
        desc: 'Komponentenebene-Diagnose an Analysegeräten, Zentrifugen und Laborautomation.',
      },
      {
        icon: '🔬',
        title: 'Bildgebende Systeme',
        desc: 'Technische Betreuung von Röntgen-, Ultraschall- und Endoskopie-Systemen.',
      },
      {
        icon: '📋',
        title: 'Dokumentierte Prozesse',
        desc: 'Strukturierte Dokumentation orientiert an GMP-Standards für jede Maßnahme.',
      },
      {
        icon: '🛡',
        title: 'Regulatorisches Verständnis',
        desc: 'Arbeit mit Blick auf IEC 62353, MPBetreibV und ISO 13485-nahe Prozesse.',
      },
    ],
    principles: [
      'Hohe Verfügbarkeit',
      'Reproduzierbare Arbeitsweise',
      'Lückenlose Dokumentation',
      'Zuverlässige Kommunikation',
      'Geringe Fehlertoleranz',
    ],
    audience: [
      'Labore und Kliniken mit technischer Eigenverantwortung',
      'Medizintechnik-Unternehmen mit Bedarf an externer Unterstützung',
      'Betriebe mit medizinnahen Systemen (Veterinär, Dental, Reha)',
    ],
    strengths: [
      'Ursachenorientierte Diagnose statt Schnelllösungen',
      'Dokumentation orientiert an regulatorischen Anforderungen',
      'Erfahrung mit Laboranalytik & bildgebenden Systemen',
    ],
  },
  {
    key: 'industrial',
    tag: 'INDUSTRIAL_AUTO',
    title: 'Industrial Systems',
    accent: GOLD,
    shortDesc:
      'Analyse, Stabilisierung und Engineering-Unterstützung für SPS-Systeme, Antriebstechnik und industrielle Steuerungen.',
    subtitle: 'Praxisnahe Engineering-Unterstützung für industrielle Systeme',
    intro:
      'Wenn Produktions- oder Prozessumgebungen betroffen sind, braucht es mehr als einen schnellen Fix. LAB-ROOT bringt technische Klarheit und saubere Umsetzung – mit Fokus auf Verfügbarkeit im realen Betrieb.',
    focus: [
      {
        icon: '⚙',
        title: 'SPS & Automatisierung',
        desc: 'Diagnose, Reparatur und Integration von SPS-Systemen (Siemens, Allen-Bradley, Beckhoff).',
      },
      {
        icon: '⚡',
        title: 'Antriebstechnik',
        desc: 'Frequenzumrichter, Servoregler und Motorsteuerungen auf Komponentenebene.',
      },
      {
        icon: '📡',
        title: 'Sensorik & Aktorik',
        desc: 'Integration und Fehleranalyse industrieller Sensoren, Ventile und Aktoren.',
      },
      {
        icon: '🏭',
        title: 'Schaltschrankbau',
        desc: 'Prüfung, Modifikation und Dokumentation industrieller Schaltanlagen.',
      },
    ],
    principles: [
      'Robuste Umsetzung',
      'Nachvollziehbare Ursachenanalyse',
      'Klare Schnittstellen',
      'Reduktion von Wiederholfehlern',
      'Wartbarkeit',
    ],
    audience: [
      'Produktionsbetriebe mit automatisierten Fertigungslinien',
      'Unternehmen mit komplexen elektronischen Steuerungssystemen',
      'Betriebe mit wiederkehrenden Störungen ohne klare Ursachen',
    ],
    strengths: [
      'Erfahrung mit SPS, Antriebstechnik & Industrieelektronik',
      'Strukturierte Umsetzung im laufenden Betrieb',
      'Nachhaltige Stabilisierung statt kurzfristiger Workarounds',
    ],
  },
  {
    key: 'it',
    tag: 'IT_INFRA',
    title: 'IT Infrastructure',
    accent: '#3b82f6',
    shortDesc:
      'Server, Netzwerke, Virtualisierung, Monitoring und Automatisierung – stabil, übersichtlich und wartbar.',
    subtitle: 'Stabile IT-Infrastruktur für einen verlässlichen Betrieb',
    intro:
      'Von Servern und Netzwerken bis zu Monitoring, Backup und Automatisierung. Wir helfen dabei, IT-Umgebungen betriebsfähig, übersichtlich und belastbar zu halten – mit Fokus auf Struktur statt Komplexität.',
    focus: [
      {
        icon: '🖥',
        title: 'Server & Systeme',
        desc: 'Linux/Windows-Server, Virtualisierung mit Proxmox/VMware, Container-Orchestrierung mit Docker.',
      },
      {
        icon: '🌐',
        title: 'Netzwerk & Konnektivität',
        desc: 'Netzwerkarchitektur, Firewalls, VPN, VLAN-Segmentierung und Systemintegration.',
      },
      {
        icon: '📊',
        title: 'Monitoring & Operations',
        desc: 'Zabbix, Grafana, Prometheus – strukturiertes Monitoring mit klarer Alarmierung.',
      },
      {
        icon: '🤖',
        title: 'Automatisierung',
        desc: 'Ansible, Docker, CI/CD – wiederkehrende Aufgaben automatisieren, Aufwand reduzieren.',
      },
    ],
    principles: [
      'Technische Klarheit',
      'Saubere Strukturierung',
      'Reproduzierbare Lösungen',
      'Langfristige Stabilität',
      'Effizienz',
    ],
    audience: [
      'KMU, die eine stabile IT-Basis brauchen',
      'Unternehmen mit wiederkehrenden IT-Problemen ohne klare Ursache',
      'Teams, die Monitoring und Transparenz verbessern wollen',
    ],
    strengths: [
      'Erfahrung mit Linux, Container & Cloud-Infrastruktur',
      'Praxisnahe Umsetzung statt unnötiger Komplexität',
      'Technisches Verständnis über Standard-IT hinaus',
    ],
  },
]
