import type { Project } from '@/types'
import {
  HeartPulse, ScanLine, Microscope,
  Cog, Gauge, CircuitBoard,
  Server, Shield, Network,
} from 'lucide-react'

export const PROJECTS: Project[] = [
  // ─── Medical ───
  {
    id: 'med-ultrasound',
    category: 'medical',
    title: 'Ultraschall-Systemdiagnose',
    client: 'Klinikverbund Oberpfalz',
    summary: 'Root-Cause-Analyse und Instandsetzung von GE Healthcare Ultraschallsystemen mit TXPS-Netzteil-Ausfällen.',
    description: 'Systematische Diagnose eines wiederkehrenden Ausfallmusters bei bildgebenden Ultraschallsystemen. Durch Spannungsanalyse auf Komponentenebene konnte der fehlerhafte Spannungsregler im TXPS-Netzteil identifiziert und das defekte GFI2-PCI-Board lokalisiert werden. Dokumentation nach GMP-Richtlinien, Ersatzteilbeschaffung und Inbetriebnahme-Validierung mit vollständigem Prüfprotokoll.',
    metrics: [
      { label: 'Systeme', value: '4' },
      { label: 'Ausfallzeit reduziert', value: '87%' },
      { label: 'Dokumentation', value: 'GMP' },
    ],
    tags: ['GE Healthcare', 'Idunn', 'TXPS', 'IEC 62353'],
    icon: ScanLine,
  },
  {
    id: 'med-labor',
    category: 'medical',
    title: 'Laborautomation Retrofit',
    client: 'MVZ Labormedizin',
    summary: 'Modernisierung der Steuerungsebene von Laboranalysegeräten für verlängerte Einsatzzyklen.',
    description: 'Technische Überholung und Software-Update für Zentrifugen und Photometer eines regionalen Labors. Integration neuer Sicherheitssensorik, Kalibrierung der Messeinheiten und Erstellung einer vollständigen Wartungsdokumentation. Schulung des Laborpersonals für Basisdiagnosen zur Verringerung externer Serviceeinsätze.',
    metrics: [
      { label: 'Geräte', value: '12' },
      { label: 'Lebenszyklus', value: '+3 J.' },
      { label: 'Serviceeinsätze', value: '−40%' },
    ],
    tags: ['Laboranalytik', 'Kalibrierung', 'MPBetreibV'],
    icon: Microscope,
  },
  {
    id: 'med-monitoring',
    category: 'medical',
    title: 'Vitaldaten-Netzwerk',
    client: 'Rehabilitationsklinik',
    summary: 'Aufbau eines zentralen Monitoring-Netzwerks für Patientenüberwachungsgeräte über drei Stationen.',
    description: 'Planung und Umsetzung einer dedizierten Netzwerkinfrastruktur für die Anbindung von Vitalzeichenmonitoren. Segmentierung des Medizinnetzwerks nach IT-Sicherheitsrichtlinien, Integration eines zentralen Dashboards für das Pflegepersonal und Erstellung eines Notfall-Betriebskonzepts bei Netzwerkausfall.',
    metrics: [
      { label: 'Stationen', value: '3' },
      { label: 'Monitore', value: '24' },
      { label: 'Verfügbarkeit', value: '99.7%' },
    ],
    tags: ['Netzwerk', 'Monitoring', 'ISO 13485'],
    icon: HeartPulse,
  },

  // ─── Industrial ───
  {
    id: 'ind-sps',
    category: 'industrial',
    title: 'SPS-Migration TIA Portal',
    client: 'Fertigungsbetrieb Automotive',
    summary: 'Migration einer STEP 7 Steuerung auf TIA Portal V18 mit Antriebsintegration und HMI-Redesign.',
    description: 'Vollständige Migration eines bestehenden STEP 7 Programms auf TIA Portal V18 für eine Produktionslinie mit 6 Frequenzumrichtern und 14 Sensoren. Neustrukturierung der Bausteinarchitektur, Integration der Antriebsparametrierung über PROFINET, Redesign der HMI-Visualisierung auf Comfort Panel und Erstellung einer kompletten Anlagendokumentation.',
    metrics: [
      { label: 'Antriebe', value: '6' },
      { label: 'I/O Punkte', value: '380+' },
      { label: 'Stillstand', value: '< 8h' },
    ],
    tags: ['TIA Portal', 'PROFINET', 'S7-1500', 'HMI'],
    icon: Cog,
  },
  {
    id: 'ind-schaltschrank',
    category: 'industrial',
    title: 'Schaltschrank-Engineering',
    client: 'Maschinenbauunternehmen',
    summary: 'Planung, Aufbau und Inbetriebnahme von Schaltschränken für eine Sondermaschine mit Sicherheitstechnik.',
    description: 'Komplettes Schaltschrank-Engineering von der E-Planung in EPLAN über die Komponentenauswahl bis zur Verdrahtung und Inbetriebnahme. Integration von Safety-Komponenten nach SIL 2, Implementierung der Sicherheitssteuerung (F-CPU), Prüfung nach EN 60204-1 und Übergabe mit vollständiger Prüfdokumentation.',
    metrics: [
      { label: 'Schaltschränke', value: '3' },
      { label: 'Sicherheit', value: 'SIL 2' },
      { label: 'Norm', value: 'EN 60204' },
    ],
    tags: ['EPLAN', 'Safety', 'EN 60204-1', 'F-CPU'],
    icon: CircuitBoard,
  },
  {
    id: 'ind-retrofit',
    category: 'industrial',
    title: 'Antriebstechnik Retrofit',
    client: 'Lebensmittelproduktion',
    summary: 'Austausch veralteter Frequenzumrichter und Optimierung der Antriebsregelung für eine Förderanlage.',
    description: 'Analyse der bestehenden Antriebstopologie, Auswahl kompatibler Ersatzumrichter und Parametrierung über Busskommunikation. Energieeffizienz-Optimierung durch angepasste Rampenzeiten und Lastprofile. Messprotokoll vor/nach Umbau mit dokumentierter Energieeinsparung.',
    metrics: [
      { label: 'Umrichter', value: '8' },
      { label: 'Energie', value: '−22%' },
      { label: 'Umsetzung', value: '5 Tage' },
    ],
    tags: ['Frequenzumrichter', 'PROFINET', 'Energieeffizienz'],
    icon: Gauge,
  },

  // ─── IT ───
  {
    id: 'it-mcp',
    category: 'it',
    title: 'MCP Operations Center',
    client: 'LAB-ROOT (intern)',
    summary: 'Aufbau einer AI-gestützten IT-Betriebsplattform mit 35+ Docker-Containern in isolierten Netzwerken.',
    description: 'Architektur und Deployment einer umfassenden IT-Betriebsplattform mit Grafana, Zabbix, Keycloak, Ollama AI-Stack, Zammad Ticketing und automatisierter Provisionierung. 5 isolierte Docker-Netzwerke, zentrales Nginx Reverse Proxy, Let\'s Encrypt Zertifikatsmanagement und vollständige Infrastructure-as-Code Dokumentation.',
    metrics: [
      { label: 'Container', value: '35+' },
      { label: 'Netzwerke', value: '5' },
      { label: 'Uptime', value: '99.9%' },
    ],
    tags: ['Docker', 'Grafana', 'Zabbix', 'Keycloak', 'Nginx'],
    icon: Server,
  },
  {
    id: 'it-security',
    category: 'it',
    title: 'Netzwerk-Segmentierung',
    client: 'Mittelständischer Betrieb',
    summary: 'Redesign der Netzwerkarchitektur mit VLAN-Segmentierung, Firewall-Policies und Monitoring-Integration.',
    description: 'Vollständige Neustrukturierung eines flachen Unternehmensnetzwerks in segmentierte VLANs mit dedizierter Firewall-Policy pro Segment. Integration von Zabbix-Monitoring für alle aktiven Netzwerkkomponenten, Einrichtung von SNMP-Traps und automatisierten Alarmketten. Dokumentation der gesamten Netzwerktopologie.',
    metrics: [
      { label: 'VLANs', value: '8' },
      { label: 'Endpoints', value: '120+' },
      { label: 'Vorfälle', value: '−95%' },
    ],
    tags: ['VLAN', 'Firewall', 'Zabbix', 'SNMP'],
    icon: Shield,
  },
  {
    id: 'it-webinfra',
    category: 'it',
    title: 'Web-Infrastruktur Stack',
    client: 'E-Commerce Unternehmen',
    summary: 'Stabilisierung und Optimierung einer Shopware-Infrastruktur mit PHP-FPM Worker-Tuning.',
    description: 'Analyse und Behebung kritischer PHP-FPM Worker-Pool-Engpässe und Segfaults die zu regelmäßigen Ausfällen führten. Implementierung von OPcache-Optimierung, Worker-Pool-Sizing basierend auf Lastprofilen, Einrichtung von automatischem Health-Monitoring und Konfiguration von Nginx-Caching-Strategien für statische Assets.',
    metrics: [
      { label: 'Response', value: '−65%' },
      { label: 'Uptime', value: '99.8%' },
      { label: 'Crashes', value: '0' },
    ],
    tags: ['Shopware', 'PHP-FPM', 'Nginx', 'OPcache'],
    icon: Network,
  },
]

export const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  all: { label: 'Alle', color: 'var(--gold)' },
  medical: { label: 'Medical', color: 'var(--color-medical)' },
  industrial: { label: 'Industrial', color: 'var(--gold)' },
  it: { label: 'IT', color: 'var(--color-it)' },
}
