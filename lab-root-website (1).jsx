import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════
   LAB-ROOT — Complete Redesign v2 (Optimized)
   ═══════════════════════════════════════════════════════════ */

const GOLD = "#CFA956";
const DARK = "#0b0f15";
const DARKER = "#070a0f";
const CARD_BG = "rgba(255,255,255,0.02)";
const CARD_BORDER = "rgba(255,255,255,0.06)";
const TEXT_PRIMARY = "#e6edf3";
const TEXT_SECONDARY = "#8b949e";
const TEXT_BODY = "#c0c8d2";
const MONO = "'JetBrains Mono', monospace";
const SANS = "'DM Sans', sans-serif";

const NAV_LINKS = [
  { id: "home", label: "Start" },
  { id: "leistungen", label: "Leistungen" },
  { id: "methode", label: "Methode" },
  { id: "about", label: "Über uns" },
  { id: "kontakt", label: "Kontakt" },
];

// ─── Hooks ───
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const handler = () => {
      const ids = NAV_LINKS.map(l => l.id);
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(ids[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return active;
}

function useCounter(end, duration = 2000, trigger = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setVal(end); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [trigger, end, duration]);
  return val;
}

// ─── Components ───
function Reveal({ children, delay = 0, style: extraStyle = {} }) {
  const [ref, visible] = useInView(0.08);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.65s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.65s cubic-bezier(.22,1,.36,1) ${delay}s`,
      ...extraStyle,
    }}>
      {children}
    </div>
  );
}

function HoverCard({ children, style, accentColor = GOLD, glowOnHover = false }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        ...style,
        borderColor: hov ? accentColor + "44" : CARD_BORDER,
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hov && glowOnHover ? `0 8px 40px ${accentColor}11` : "none",
        transition: "all 0.35s cubic-bezier(.22,1,.36,1)",
      }}
    >
      {children}
    </div>
  );
}

// ─── Service Data ───
const SERVICES = [
  {
    key: "medical",
    tag: "MEDICAL_SYS",
    title: "Medical Systems",
    accent: "#22c55e",
    shortDesc: "Technische Betreuung medizinischer und medizinnaher Systeme – Laboranalytik, bildgebende Systeme, Steuerungseinheiten.",
    subtitle: "Technische Unterstützung für stabile medizinische Betriebsumgebungen",
    intro: "In sensiblen Umgebungen zählt nicht nur, dass ein System wieder läuft – sondern dass die Lösung sauber, dokumentiert und betriebssicher umgesetzt wird. LAB-ROOT arbeitet mit dem Verständnis für regulatorische Anforderungen und hohe Verfügbarkeit.",
    focus: [
      { icon: "⚕", title: "Diagnostik & Laboranalytik", desc: "Komponentenebene-Diagnose an Analysegeräten, Zentrifugen und Laborautomation." },
      { icon: "🔬", title: "Bildgebende Systeme", desc: "Technische Betreuung von Röntgen-, Ultraschall- und Endoskopie-Systemen." },
      { icon: "📋", title: "Dokumentierte Prozesse", desc: "Strukturierte Dokumentation orientiert an GMP-Standards für jede Maßnahme." },
      { icon: "🛡", title: "Regulatorisches Verständnis", desc: "Arbeit mit Blick auf IEC 62353, MPBetreibV und ISO 13485-nahe Prozesse." },
    ],
    principles: ["Hohe Verfügbarkeit", "Reproduzierbare Arbeitsweise", "Lückenlose Dokumentation", "Zuverlässige Kommunikation", "Geringe Fehlertoleranz"],
    audience: [
      "Labore und Kliniken mit technischer Eigenverantwortung",
      "Medizintechnik-Unternehmen mit Bedarf an externer Unterstützung",
      "Betriebe mit medizinnahen Systemen (Veterinär, Dental, Reha)",
    ],
    strengths: [
      "Ursachenorientierte Diagnose statt Schnelllösungen",
      "Dokumentation orientiert an regulatorischen Anforderungen",
      "Erfahrung mit Laboranalytik & bildgebenden Systemen",
    ],
  },
  {
    key: "industrial",
    tag: "INDUSTRIAL_AUTO",
    title: "Industrial Systems",
    accent: GOLD,
    shortDesc: "Analyse, Stabilisierung und Engineering-Unterstützung für SPS-Systeme, Antriebstechnik und industrielle Steuerungen.",
    subtitle: "Praxisnahe Engineering-Unterstützung für industrielle Systeme",
    intro: "Wenn Produktions- oder Prozessumgebungen betroffen sind, braucht es mehr als einen schnellen Fix. LAB-ROOT bringt technische Klarheit und saubere Umsetzung – mit Fokus auf Verfügbarkeit im realen Betrieb.",
    focus: [
      { icon: "⚙", title: "SPS & Automatisierung", desc: "Diagnose, Reparatur und Integration von SPS-Systemen (Siemens, Allen-Bradley, Beckhoff)." },
      { icon: "⚡", title: "Antriebstechnik", desc: "Frequenzumrichter, Servoregler und Motorsteuerungen auf Komponentenebene." },
      { icon: "📡", title: "Sensorik & Aktorik", desc: "Integration und Fehleranalyse industrieller Sensoren, Ventile und Aktoren." },
      { icon: "🏭", title: "Schaltschrankbau", desc: "Prüfung, Modifikation und Dokumentation industrieller Schaltanlagen." },
    ],
    principles: ["Robuste Umsetzung", "Nachvollziehbare Ursachenanalyse", "Klare Schnittstellen", "Reduktion von Wiederholfehlern", "Wartbarkeit"],
    audience: [
      "Produktionsbetriebe mit automatisierten Fertigungslinien",
      "Unternehmen mit komplexen elektronischen Steuerungssystemen",
      "Betriebe mit wiederkehrenden Störungen ohne klare Ursachen",
    ],
    strengths: [
      "Erfahrung mit SPS, Antriebstechnik & Industrieelektronik",
      "Strukturierte Umsetzung im laufenden Betrieb",
      "Nachhaltige Stabilisierung statt kurzfristiger Workarounds",
    ],
  },
  {
    key: "it",
    tag: "IT_INFRA",
    title: "IT Infrastructure",
    accent: "#3b82f6",
    shortDesc: "Server, Netzwerke, Virtualisierung, Monitoring und Automatisierung – stabil, übersichtlich und wartbar.",
    subtitle: "Stabile IT-Infrastruktur für einen verlässlichen Betrieb",
    intro: "Von Servern und Netzwerken bis zu Monitoring, Backup und Automatisierung. Wir helfen dabei, IT-Umgebungen betriebsfähig, übersichtlich und belastbar zu halten – mit Fokus auf Struktur statt Komplexität.",
    focus: [
      { icon: "🖥", title: "Server & Systeme", desc: "Linux/Windows-Server, Virtualisierung mit Proxmox/VMware, Container-Orchestrierung mit Docker." },
      { icon: "🌐", title: "Netzwerk & Konnektivität", desc: "Netzwerkarchitektur, Firewalls, VPN, VLAN-Segmentierung und Systemintegration." },
      { icon: "📊", title: "Monitoring & Operations", desc: "Zabbix, Grafana, Prometheus – strukturiertes Monitoring mit klarer Alarmierung." },
      { icon: "🤖", title: "Automatisierung", desc: "Ansible, Docker, CI/CD – wiederkehrende Aufgaben automatisieren, Aufwand reduzieren." },
    ],
    principles: ["Technische Klarheit", "Saubere Strukturierung", "Reproduzierbare Lösungen", "Langfristige Stabilität", "Effizienz"],
    audience: [
      "KMU, die eine stabile IT-Basis brauchen",
      "Unternehmen mit wiederkehrenden IT-Problemen ohne klare Ursache",
      "Teams, die Monitoring und Transparenz verbessern wollen",
    ],
    strengths: [
      "Erfahrung mit Linux, Container & Cloud-Infrastruktur",
      "Praxisnahe Umsetzung statt unnötiger Komplexität",
      "Technisches Verständnis über Standard-IT hinaus",
    ],
  },
];

const PROCESS_STEPS = [
  { num: "01", title: "Erfassen", desc: "Technische Lage, Abhängigkeiten und Auswirkungen im Betrieb systematisch aufnehmen.", icon: "◎" },
  { num: "02", title: "Analysieren", desc: "Die eigentliche Fehlerursache identifizieren – nicht nur Symptome behandeln.", icon: "⟐" },
  { num: "03", title: "Umsetzen", desc: "Maßnahmen stabil, nachvollziehbar und praxisnah in den Betrieb integrieren.", icon: "⬡" },
  { num: "04", title: "Dokumentieren", desc: "Arbeitsschritte, Konfigurationen und Änderungen lückenlos festhalten.", icon: "▣" },
  { num: "05", title: "Stabilisieren", desc: "Wiederholfehler reduzieren und technische Verlässlichkeit dauerhaft erhöhen.", icon: "◈" },
];

// ─── Floating Particles ───
function ParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let raf;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      c.width = c.offsetWidth * dpr;
      c.height = c.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);
    const w = () => c.offsetWidth;
    const h = () => c.offsetHeight;
    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * w(),
      y: Math.random() * h(),
      r: Math.random() * 1.4 + 0.3,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.18,
      a: Math.random() * 0.25 + 0.05,
    }));
    const draw = () => {
      const lw = w(), lh = h();
      ctx.clearRect(0, 0, lw, lh);
      particles.forEach(p => {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0) p.x = lw;
        if (p.x > lw) p.x = 0;
        if (p.y < 0) p.y = lh;
        if (p.y > lh) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(207,169,86,${p.a})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(207,169,86,${0.035 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

function Counter({ end, suffix = "", trigger }) {
  const val = useCounter(end, 1800, trigger);
  return <span>{val}{suffix}</span>;
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Nach oben"
      style={{
        position: "fixed", bottom: 32, right: 32, zIndex: 999,
        width: 48, height: 48, borderRadius: 14,
        background: "rgba(207,169,86,0.15)", border: `1px solid ${GOLD}33`,
        color: GOLD, fontSize: 20, cursor: "pointer",
        backdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        transition: "all 0.3s ease",
      }}
    >↑</button>
  );
}

// ═══════════════════════════════════════
// MAIN
// ═══════════════════════════════════════
export default function LabRootWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", telefon: "", betreff: "Allgemeine Anfrage", nachricht: "" });
  const [formSent, setFormSent] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const formTimeoutRef = useRef(null);
  const activeSection = useActiveSection();
  const [statsRef, statsVisible] = useInView(0.3);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  }, []);

  const validateForm = () => {
    const err = {};
    if (!formData.name.trim()) err.name = true;
    if (!formData.email.trim() || !formData.email.includes("@")) err.email = true;
    if (!formData.nachricht.trim()) err.nachricht = true;
    setFormErrors(err);
    return Object.keys(err).length === 0;
  };

  // Cleanup form timeout on unmount
  useEffect(() => {
    return () => { if (formTimeoutRef.current) clearTimeout(formTimeoutRef.current); };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setFormSent(true);
    formTimeoutRef.current = setTimeout(() => setFormSent(false), 5000);
  };

  const svc = SERVICES[activeService];

  return (
    <div style={{ background: DARK, color: TEXT_PRIMARY, fontFamily: SANS, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; scroll-padding-top: 80px; }
        body { overflow-x: hidden; }
        ::selection { background: ${GOLD}44; color: #fff; }
        input:focus, textarea:focus, select:focus { border-color: ${GOLD}88 !important; outline: none; box-shadow: 0 0 0 3px ${GOLD}15; }
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:.4} }
        @keyframes slideIn { from{opacity:0;transform:translateX(-12px)}to{opacity:1;transform:translateX(0)} }
        @keyframes fadeTab { from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)} }
        @media(max-width:768px){
          .desktop-nav{display:none!important}
          .mobile-toggle{display:flex!important}
          .hero-title{font-size:2.2rem!important}
          .stats-grid{grid-template-columns:repeat(2,1fr)!important}
          .service-tabs{flex-direction:column!important}
          .focus-grid{grid-template-columns:1fr!important}
          .process-grid{grid-template-columns:repeat(2,1fr)!important}
          .about-grid{grid-template-columns:1fr!important}
          .contact-grid{grid-template-columns:1fr!important}
          .team-grid{grid-template-columns:1fr!important}
          .form-row{grid-template-columns:1fr!important}
        }
        @media(min-width:769px){
          .mobile-toggle{display:none!important}
          .mobile-menu{display:none!important}
        }
      `}</style>

      {/* ═══ NAV ═══ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(11,15,21,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(1.2)" : "none",
        borderBottom: scrolled ? `1px solid ${GOLD}15` : "1px solid transparent",
        transition: "all 0.4s cubic-bezier(.22,1,.36,1)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center", height: 72 }}>
          <button onClick={() => scrollTo("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, border: `2px solid ${GOLD}`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MONO, fontWeight: 600, fontSize: 13, color: GOLD }}>LR</div>
            <span style={{ fontFamily: MONO, fontWeight: 600, fontSize: 15, color: TEXT_PRIMARY, letterSpacing: 2.5 }}>LAB-ROOT</span>
          </button>

          <div className="desktop-nav" style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {NAV_LINKS.map(link => (
              <button key={link.id} onClick={() => scrollTo(link.id)} style={{
                background: activeSection === link.id ? `${GOLD}12` : "none",
                border: "none", cursor: "pointer", padding: "8px 16px", borderRadius: 8,
                fontFamily: SANS, fontSize: 14, fontWeight: 500,
                color: activeSection === link.id ? GOLD : TEXT_SECONDARY,
                transition: "all 0.25s ease",
              }}>{link.label}</button>
            ))}
            <button onClick={() => scrollTo("kontakt")} style={{
              ...btnStyle, padding: "10px 24px", fontSize: 13, marginLeft: 8,
              background: GOLD, color: DARK, border: "none", cursor: "pointer",
            }}>Anfrage senden</button>
          </div>

          <button className="mobile-toggle" aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} style={{
            display: "none", background: "none", border: "none", cursor: "pointer",
            width: 40, height: 40, alignItems: "center", justifyContent: "center",
            flexDirection: "column", gap: menuOpen ? 0 : 6, position: "relative",
          }}>
            <span style={{ width: 24, height: 2, background: GOLD, borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translateY(1px)" : "none", position: menuOpen ? "absolute" : "relative" }} />
            {!menuOpen && <span style={{ width: 24, height: 2, background: GOLD, borderRadius: 2 }} />}
            <span style={{ width: 24, height: 2, background: GOLD, borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-1px)" : "none", position: menuOpen ? "absolute" : "relative" }} />
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-menu" style={{ background: "rgba(11,15,21,0.97)", backdropFilter: "blur(24px)", padding: "12px 24px 24px", borderTop: `1px solid ${GOLD}15` }}>
            {NAV_LINKS.map((link, i) => (
              <button key={link.id} onClick={() => scrollTo(link.id)} style={{
                display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer",
                padding: "14px 0", fontSize: 16, fontWeight: 500,
                color: activeSection === link.id ? GOLD : TEXT_SECONDARY,
                borderBottom: i < NAV_LINKS.length - 1 ? `1px solid ${CARD_BORDER}` : "none",
                fontFamily: SANS, animation: `slideIn 0.3s ease ${i * 0.05}s both`,
              }}>{link.label}</button>
            ))}
          </div>
        )}
      </nav>

      {/* ═══ HERO ═══ */}
      <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <ParticleField />
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${GOLD}05 1px, transparent 1px), linear-gradient(90deg, ${GOLD}05 1px, transparent 1px)`, backgroundSize: "72px 72px" }} />
        <div style={{ position: "absolute", top: "15%", right: "-5%", width: 700, height: 700, background: `radial-gradient(circle, ${GOLD}08 0%, transparent 65%)`, borderRadius: "50%", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "-10%", width: 500, height: 500, background: "radial-gradient(circle, rgba(34,197,94,0.04) 0%, transparent 65%)", borderRadius: "50%", filter: "blur(60px)" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "140px 24px 100px", position: "relative", zIndex: 1, width: "100%" }}>
          <Reveal>
            <div style={{ fontFamily: MONO, fontSize: 12, color: GOLD, letterSpacing: 3, textTransform: "uppercase", marginBottom: 28, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 8, height: 8, background: "#22c55e", borderRadius: "50%", boxShadow: "0 0 12px rgba(34,197,94,0.6)", animation: "pulse 2s ease infinite" }} />
              ENGINEERING · DIAGNOSTICS · RELIABILITY
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="hero-title" style={{ fontSize: "clamp(2.6rem, 6vw, 4.8rem)", fontWeight: 700, lineHeight: 1.06, letterSpacing: "-0.025em", marginBottom: 28, maxWidth: 820 }}>
              Precision Engineering.<br />
              <span style={{ color: GOLD }}>Intelligente Lösungen.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.2rem)", color: TEXT_SECONDARY, lineHeight: 1.75, maxWidth: 600, marginBottom: 48 }}>
              Spezialisierte technische Dienstleistungen für Medical, Industrial und IT-Infrastruktur.
              Strukturierte Fehleranalyse, belastbare Instandhaltung und dokumentierte Umsetzung –
              von Ingenieuren, für den realen Betrieb.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button onClick={() => scrollTo("kontakt")} style={{ ...btnStyle, background: GOLD, color: DARK, border: "none", cursor: "pointer", fontSize: 15, padding: "16px 36px" }}>Projekt anfragen</button>
              <button onClick={() => scrollTo("leistungen")} style={{ ...btnStyle, background: "transparent", color: TEXT_PRIMARY, border: "1px solid rgba(255,255,255,0.15)", cursor: "pointer", fontSize: 15, padding: "16px 36px" }}>Leistungen entdecken</button>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div ref={statsRef} className="stats-grid" style={{ marginTop: 80, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: `${GOLD}12`, borderRadius: 16, overflow: "hidden", border: `1px solid ${GOLD}15` }}>
              {[
                { end: 3, label: "Fachbereiche", static: "3" },
                { end: 100, suffix: "%", label: "Dokumentiert" },
                { end: 0, label: "Reaktionszeit", static: "<24h" },
                { end: 0, label: "Standort", static: "DE" },
              ].map((s, i) => (
                <div key={i} style={{ padding: "32px 20px", background: DARK, textAlign: "center" }}>
                  <div style={{ fontFamily: MONO, fontSize: 30, fontWeight: 600, color: GOLD, marginBottom: 6 }}>
                    {s.static ? s.static : <Counter end={s.end} suffix={s.suffix || ""} trigger={statsVisible} />}
                  </div>
                  <div style={{ fontSize: 13, color: TEXT_SECONDARY, letterSpacing: 0.5 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ SERVICES — Tabbed ═══ */}
      <section id="leistungen" style={{ padding: "120px 0 100px", background: DARKER }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span style={tagBadgeStyle}>LEISTUNGEN</span>
              <h2 style={{ ...sectionTitleStyle, marginTop: 16 }}>Drei Bereiche. Ein Anspruch.</h2>
              <p style={{ ...subtitleStyle, maxWidth: 560, margin: "16px auto 0" }}>Technische Exzellenz, strukturiertes Vorgehen und nachvollziehbare Ergebnisse.</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="service-tabs" style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 56 }}>
              {SERVICES.map((s, i) => (
                <button key={s.key} onClick={() => setActiveService(i)} style={{
                  background: activeService === i ? `${s.accent}18` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${activeService === i ? s.accent + "44" : CARD_BORDER}`,
                  borderRadius: 12, padding: "16px 28px", cursor: "pointer", transition: "all 0.3s ease",
                  color: activeService === i ? s.accent : TEXT_SECONDARY,
                  fontFamily: SANS, fontWeight: activeService === i ? 600 : 500, fontSize: 15, flex: "1 1 0", maxWidth: 280,
                }}>
                  <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: 2, marginBottom: 8, opacity: 0.7 }}>{s.tag}</div>
                  {s.title}
                </button>
              ))}
            </div>
          </Reveal>

          <div key={svc.key} style={{ animation: "fadeTab 0.4s ease" }}>
            <div className="focus-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginBottom: 56, alignItems: "start" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 4, height: 32, background: svc.accent, borderRadius: 2 }} />
                  <h3 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700 }}>{svc.title}</h3>
                </div>
                <p style={{ color: TEXT_SECONDARY, fontSize: 17, lineHeight: 1.7, marginBottom: 16 }}>{svc.subtitle}</p>
                <p style={{ color: TEXT_BODY, fontSize: 15, lineHeight: 1.8 }}>{svc.intro}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 28 }}>
                  {svc.principles.map((p, i) => (
                    <span key={i} style={{ padding: "8px 16px", fontSize: 13, color: TEXT_BODY, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 100 }}>{p}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {svc.focus.map((f, i) => (
                  <HoverCard key={i} accentColor={svc.accent} style={{ display: "flex", gap: 16, padding: "20px 18px", background: CARD_BG, borderRadius: 14, border: `1px solid ${CARD_BORDER}` }}>
                    <div style={{ fontSize: 22, flexShrink: 0, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", background: `${svc.accent}10`, borderRadius: 10 }}>{f.icon}</div>
                    <div>
                      <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{f.title}</h4>
                      <p style={{ fontSize: 13, color: TEXT_SECONDARY, lineHeight: 1.6 }}>{f.desc}</p>
                    </div>
                  </HoverCard>
                ))}
              </div>
            </div>

            <div className="focus-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div style={{ padding: "36px 32px", background: `${svc.accent}06`, borderRadius: 16, border: `1px solid ${svc.accent}15` }}>
                <h4 style={{ fontFamily: MONO, fontSize: 12, letterSpacing: 2, color: svc.accent, marginBottom: 24, textTransform: "uppercase" }}>Zielgruppe</h4>
                {svc.audience.map((a, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: i < svc.audience.length - 1 ? 16 : 0 }}>
                    <span style={{ color: svc.accent, fontFamily: MONO, fontSize: 16, marginTop: 1, flexShrink: 0 }}>→</span>
                    <p style={{ fontSize: 14, color: TEXT_BODY, lineHeight: 1.65 }}>{a}</p>
                  </div>
                ))}
              </div>
              <div style={{ padding: "36px 32px", background: CARD_BG, borderRadius: 16, border: `1px solid ${CARD_BORDER}` }}>
                <h4 style={{ fontFamily: MONO, fontSize: 12, letterSpacing: 2, color: GOLD, marginBottom: 24, textTransform: "uppercase" }}>Warum LAB-ROOT</h4>
                {svc.strengths.map((s, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: i < svc.strengths.length - 1 ? 16 : 0 }}>
                    <div style={{ width: 3, height: 20, background: GOLD, borderRadius: 2, marginTop: 2, flexShrink: 0 }} />
                    <p style={{ fontSize: 14, color: TEXT_BODY, lineHeight: 1.65 }}>{s}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 48, textAlign: "center" }}>
              <button onClick={() => scrollTo("kontakt")} style={{
                ...btnStyle, background: svc.accent, color: svc.key === "industrial" ? DARK : "#fff",
                border: "none", cursor: "pointer", padding: "14px 36px", fontSize: 15,
              }}>{svc.title}-Anfrage senden</button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ METHODE ═══ */}
      <section id="methode" style={{ padding: "120px 0 100px", background: DARK }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <span style={tagBadgeStyle}>METHODE</span>
              <h2 style={{ ...sectionTitleStyle, marginTop: 16 }}>Strukturiert statt reaktiv</h2>
              <p style={{ ...subtitleStyle, maxWidth: 520, margin: "16px auto 0" }}>Unser Vorgehen ist in allen Bereichen gleich: methodisch, dokumentiert und ursachenorientiert.</p>
            </div>
          </Reveal>

          <div className="process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
            {PROCESS_STEPS.map((step, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{
                  padding: "32px 20px", background: CARD_BG, borderRadius: 16,
                  border: `1px solid ${CARD_BORDER}`, textAlign: "center", height: "100%",
                  position: "relative", overflow: "hidden",
                }}>
                  <div style={{ position: "absolute", top: -12, right: -8, fontFamily: MONO, fontSize: 72, fontWeight: 700, color: `${GOLD}06`, lineHeight: 1 }}>{step.num}</div>
                  <div style={{ width: 48, height: 48, margin: "0 auto 20px", background: `${GOLD}08`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: GOLD }}>{step.icon}</div>
                  <div style={{ fontFamily: MONO, fontSize: 11, color: GOLD, letterSpacing: 2, marginBottom: 8 }}>SCHRITT {step.num}</div>
                  <h4 style={{ fontSize: 17, fontWeight: 600, marginBottom: 12 }}>{step.title}</h4>
                  <p style={{ fontSize: 13, color: TEXT_SECONDARY, lineHeight: 1.65 }}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRUST BAR ═══ */}
      <Reveal>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div style={{
            display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 40,
            padding: "48px 32px", background: DARKER, borderRadius: 20,
            border: `1px solid ${CARD_BORDER}`, marginTop: -40, position: "relative", zIndex: 2,
          }}>
            {["ISO 13485-nah", "IEC 62353", "MPBetreibV", "Technische Compliance", "GMP-orientiert", "TIA Portal", "Docker", "Zabbix"].map((t, i) => (
              <span key={i} style={{ fontFamily: MONO, fontSize: 12, color: TEXT_SECONDARY, letterSpacing: 1.5, opacity: 0.65 }}>{t}</span>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ═══ ABOUT ═══ */}
      <section id="about" style={{ padding: "120px 0 100px", background: DARKER }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <Reveal>
            <span style={tagBadgeStyle}>ÜBER UNS</span>
            <h2 style={{ ...sectionTitleStyle, marginTop: 16, marginBottom: 20 }}>Engineering mit Verantwortung</h2>
            <p style={{ ...subtitleStyle, maxWidth: 680 }}>
              LAB-ROOT ist ein technisches Dienstleistungsunternehmen mit Sitz in Cham, Deutschland.
              Gegründet von Ingenieuren mit dem Anspruch, technische Probleme nachhaltig und dokumentiert zu lösen.
            </p>
          </Reveal>

          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 56 }}>
            {[
              { title: "Unser Anspruch", text: "Wir arbeiten methodisch, transparent und ursachenorientiert. Jede Maßnahme wird dokumentiert, jede Lösung ist nachvollziehbar. Unser Ziel ist nicht der schnellste Fix, sondern die stabilste Lösung." },
              { title: "Unsere Stärke", text: "Die Kombination aus Medical-, Industrial- und IT-Kompetenz macht uns einzigartig. Wir verstehen Systeme im Zusammenspiel von Hardware, Software und Betriebsprozessen." },
              { title: "Unser Versprechen", text: "Klare Kommunikation, ehrliche Einschätzungen und technische Arbeit, auf die man sich verlassen kann. Wir arbeiten partnerschaftlich – nicht als austauschbarer Dienstleister." },
            ].map((card, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <HoverCard glowOnHover style={{ padding: "40px 28px", background: DARK, border: `1px solid ${CARD_BORDER}`, borderRadius: 16, height: "100%" }}>
                  <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: GOLD }}>{card.title}</h3>
                  <p style={{ fontSize: 15, color: TEXT_BODY, lineHeight: 1.8 }}>{card.text}</p>
                </HoverCard>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div style={{ marginTop: 72 }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 32 }}>Team</h3>
              <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
                {[
                  { name: "Mahmoud Baddour, M.Eng.", role: "Founder & Owner", focus: "Medical & Industrial Engineering", initials: "MB" },
                  { name: "Moustafa Almasri", role: "CTO & Lead Systems Engineer", focus: "IT Infrastructure & Automation", initials: "MA" },
                ].map((m, i) => (
                  <HoverCard key={i} glowOnHover style={{ display: "flex", gap: 20, padding: "28px 24px", background: DARK, border: `1px solid ${CARD_BORDER}`, borderRadius: 14, alignItems: "center" }}>
                    <div style={{ width: 60, height: 60, flexShrink: 0, background: `${GOLD}10`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MONO, fontWeight: 600, fontSize: 20, color: GOLD }}>{m.initials}</div>
                    <div>
                      <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 3 }}>{m.name}</h4>
                      <p style={{ fontSize: 13, color: GOLD, fontFamily: MONO, marginBottom: 6 }}>{m.role}</p>
                      <p style={{ fontSize: 13, color: TEXT_SECONDARY }}>{m.focus}</p>
                    </div>
                  </HoverCard>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ KONTAKT ═══ */}
      <section id="kontakt" style={{ padding: "120px 0 80px", background: DARK }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span style={tagBadgeStyle}>KONTAKT</span>
              <h2 style={{ ...sectionTitleStyle, marginTop: 16 }}>Sprechen Sie mit uns</h2>
              <p style={{ ...subtitleStyle, maxWidth: 500, margin: "16px auto 0" }}>Ob technische Anfrage, Projektbesprechung oder allgemeine Frage – wir melden uns zeitnah.</p>
            </div>
          </Reveal>

          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 48 }}>
            <Reveal delay={0.1}>
              {formSent ? (
                <div style={{ padding: 56, background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)", borderRadius: 20, textAlign: "center" }}>
                  <div style={{ fontSize: 48, marginBottom: 20, color: "#22c55e" }}>✓</div>
                  <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 10 }}>Nachricht gesendet</h3>
                  <p style={{ color: TEXT_SECONDARY, fontSize: 15 }}>Wir melden uns in der Regel innerhalb von 24 Stunden.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ padding: "40px 36px", background: CARD_BG, border: `1px solid ${CARD_BORDER}`, borderRadius: 20 }}>
                  <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={labelStyle}>Name *</label>
                      <input type="text" value={formData.name}
                        onChange={e => { setFormData({...formData, name: e.target.value}); setFormErrors({...formErrors, name: false}); }}
                        style={{ ...inputStyle, borderColor: formErrors.name ? "#ef4444" : "rgba(255,255,255,0.1)" }}
                        placeholder="Vollständiger Name" />
                    </div>
                    <div>
                      <label style={labelStyle}>E-Mail *</label>
                      <input type="email" value={formData.email}
                        onChange={e => { setFormData({...formData, email: e.target.value}); setFormErrors({...formErrors, email: false}); }}
                        style={{ ...inputStyle, borderColor: formErrors.email ? "#ef4444" : "rgba(255,255,255,0.1)" }}
                        placeholder="ihre@email.de" />
                    </div>
                  </div>
                  <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={labelStyle}>Telefon (optional)</label>
                      <input type="tel" value={formData.telefon}
                        onChange={e => setFormData({...formData, telefon: e.target.value})}
                        style={inputStyle} placeholder="+49 ..." />
                    </div>
                    <div>
                      <label style={labelStyle}>Betreff</label>
                      <select value={formData.betreff}
                        onChange={e => setFormData({...formData, betreff: e.target.value})}
                        style={inputStyle}>
                        <option>Allgemeine Anfrage</option>
                        <option>Medical Systems</option>
                        <option>Industrial Systems</option>
                        <option>IT Infrastructure</option>
                        <option>Projektbesprechung</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    <label style={labelStyle}>Nachricht *</label>
                    <textarea value={formData.nachricht}
                      onChange={e => { setFormData({...formData, nachricht: e.target.value}); setFormErrors({...formErrors, nachricht: false}); }}
                      style={{ ...inputStyle, minHeight: 130, resize: "vertical", borderColor: formErrors.nachricht ? "#ef4444" : "rgba(255,255,255,0.1)" }}
                      placeholder="Beschreiben Sie kurz Ihr Anliegen..." />
                  </div>
                  <button type="submit" style={{
                    ...btnStyle, width: "100%", textAlign: "center",
                    background: GOLD, color: DARK, border: "none", cursor: "pointer",
                    fontSize: 15, padding: "16px 0", fontWeight: 600,
                  }}>Nachricht senden</button>
                  {Object.values(formErrors).some(Boolean) && (
                    <p style={{ color: "#ef4444", fontSize: 13, marginTop: 12, textAlign: "center" }}>Bitte füllen Sie alle Pflichtfelder korrekt aus.</p>
                  )}
                </form>
              )}
            </Reveal>

            <Reveal delay={0.2}>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={infoCardStyle}>
                  <h4 style={infoTitleStyle}>Direkter Kontakt</h4>
                  {[
                    { name: "Mahmoud Baddour, M.Eng.", role: "Founder", tel: "+49 177 538 9347" },
                    { name: "Moustafa Almasri", role: "CTO", tel: "+49 163 137 1376" },
                  ].map((c, i) => (
                    <div key={i} style={{ marginBottom: i === 0 ? 14 : 0 }}>
                      <p style={{ fontSize: 13, color: TEXT_SECONDARY, marginBottom: 3 }}>{c.name} — {c.role}</p>
                      <a href={`tel:${c.tel.replace(/\s/g, "")}`} style={{ color: TEXT_PRIMARY, textDecoration: "none", fontSize: 15, fontWeight: 500 }}>{c.tel}</a>
                    </div>
                  ))}
                </div>
                <div style={infoCardStyle}>
                  <h4 style={infoTitleStyle}>Standort</h4>
                  <p style={{ color: TEXT_BODY, fontSize: 15, lineHeight: 1.75 }}>LAB-ROOT (Root Trading)<br />Steinweg 6<br />93413 Cham, Deutschland</p>
                </div>
                <div style={infoCardStyle}>
                  <h4 style={infoTitleStyle}>E-Mail</h4>
                  <a href="mailto:info@lab-root.com" style={{ color: TEXT_PRIMARY, textDecoration: "none", fontSize: 16, fontWeight: 500 }}>info@lab-root.com</a>
                  <p style={{ fontSize: 12, color: TEXT_SECONDARY, marginTop: 8 }}>Antwort i.d.R. innerhalb von 24h</p>
                </div>
                <div style={{ padding: "16px 20px", background: `${GOLD}04`, borderRadius: 12, border: `1px solid ${GOLD}10` }}>
                  <p style={{ fontFamily: MONO, fontSize: 11, color: TEXT_SECONDARY, lineHeight: 1.7 }}>USt-IdNr: DE367983356 · StNr: 211/202/10138</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ padding: "40px 24px 28px", borderTop: `1px solid ${CARD_BORDER}`, background: DARKER }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 26, height: 26, border: `1.5px solid ${GOLD}`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MONO, fontWeight: 600, fontSize: 9, color: GOLD }}>LR</div>
            <span style={{ fontFamily: MONO, fontSize: 12, color: TEXT_SECONDARY }}>LAB-ROOT — Engineering mit Verantwortung</span>
          </div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {NAV_LINKS.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: TEXT_SECONDARY, fontFamily: SANS }}>{l.label}</button>
            ))}
          </div>
          <p style={{ fontSize: 12, color: "#3d444d" }}>© {new Date().getFullYear()} LAB-ROOT. Alle Rechte vorbehalten. · <a href="#impressum" style={{ color: "#3d444d", textDecoration: "underline" }}>Impressum</a> · <a href="#datenschutz" style={{ color: "#3d444d", textDecoration: "underline" }}>Datenschutz</a></p>
        </div>
      </footer>

      <BackToTop />
    </div>
  );
}

// ─── Shared Styles ───
const btnStyle = { display: "inline-block", padding: "14px 32px", fontWeight: 600, fontSize: 14, borderRadius: 11, textDecoration: "none", fontFamily: SANS, letterSpacing: "0.01em", transition: "all 0.3s ease" };
const tagBadgeStyle = { display: "inline-block", fontFamily: MONO, fontSize: 11, letterSpacing: 3, color: GOLD, textTransform: "uppercase", background: `${GOLD}0a`, padding: "6px 16px", borderRadius: 6, border: `1px solid ${GOLD}18` };
const sectionTitleStyle = { fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 700, letterSpacing: "-0.015em", lineHeight: 1.15 };
const subtitleStyle = { fontSize: "clamp(1rem, 1.4vw, 1.1rem)", color: TEXT_SECONDARY, lineHeight: 1.7 };
const labelStyle = { display: "block", fontSize: 12, fontWeight: 500, color: TEXT_SECONDARY, marginBottom: 8, fontFamily: MONO };
const inputStyle = { width: "100%", padding: "13px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: TEXT_PRIMARY, fontSize: 15, fontFamily: SANS, transition: "border-color 0.25s ease, box-shadow 0.25s ease", boxSizing: "border-box" };
const infoCardStyle = { padding: "24px 22px", background: CARD_BG, borderRadius: 14, border: `1px solid ${CARD_BORDER}` };
const infoTitleStyle = { fontSize: 12, fontWeight: 600, color: GOLD, fontFamily: MONO, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 16 };
