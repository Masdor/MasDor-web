import { Reveal } from '@/components/ui/Reveal'
import { useContactForm } from '@/hooks/useContactForm'
import { CONTACT_PERSONS, COMPANY_INFO } from '@/data/team'
import { GOLD, DARK, CARD_BG, CARD_BORDER, TEXT_PRIMARY, TEXT_SECONDARY, TEXT_BODY, MONO, SANS } from '@/styles/tokens'

const tagBadgeStyle = { display: 'inline-block' as const, fontFamily: MONO, fontSize: 11, letterSpacing: 3, color: GOLD, textTransform: 'uppercase' as const, background: `${GOLD}0a`, padding: '6px 16px', borderRadius: 6, border: `1px solid ${GOLD}18` }
const sectionTitleStyle = { fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, letterSpacing: '-0.015em', lineHeight: 1.15 }
const subtitleStyle = { fontSize: 'clamp(1rem, 1.4vw, 1.1rem)', color: TEXT_SECONDARY, lineHeight: 1.7 }
const btnStyle = { display: 'inline-block' as const, fontWeight: 600, borderRadius: 11, fontFamily: SANS, letterSpacing: '0.01em', transition: 'all 0.3s ease', cursor: 'pointer' }
const labelStyle = { display: 'block' as const, fontFamily: MONO, fontSize: 11, letterSpacing: 1.5, color: TEXT_SECONDARY, marginBottom: 8, textTransform: 'uppercase' as const }
const inputStyle = { width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: TEXT_PRIMARY, fontSize: 15, fontFamily: SANS, transition: 'border-color 0.3s ease' }
const infoCardStyle = { padding: '24px 20px', background: CARD_BG, borderRadius: 14, border: `1px solid ${CARD_BORDER}` }
const infoTitleStyle = { fontFamily: MONO, fontSize: 11, letterSpacing: 2, color: GOLD, marginBottom: 16, textTransform: 'uppercase' as const }

export function Contact() {
  const { formData, formErrors, formSent, updateField, handleSubmit } = useContactForm()

  return (
    <section id="kontakt" style={{ padding: '120px 0 80px', background: 'var(--dark)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={tagBadgeStyle}>KONTAKT</span>
            <h2 style={{ ...sectionTitleStyle, marginTop: 16 }}>Sprechen Sie mit uns</h2>
            <p style={{ ...subtitleStyle, maxWidth: 500, margin: '16px auto 0' }}>Ob technische Anfrage, Projektbesprechung oder allgemeine Frage – wir melden uns zeitnah.</p>
          </div>
        </Reveal>

        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 48 }}>
          <Reveal delay={0.1}>
            {formSent ? (
              <div style={{ padding: 56, background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: 20, textAlign: 'center' }}>
                <div style={{ fontSize: 48, marginBottom: 20, color: '#22c55e' }}>✓</div>
                <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 10 }}>Nachricht gesendet</h3>
                <p style={{ color: TEXT_SECONDARY, fontSize: 15 }}>Wir melden uns in der Regel innerhalb von 24 Stunden.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ padding: '40px 36px', background: CARD_BG, border: `1px solid ${CARD_BORDER}`, borderRadius: 20 }}>
                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={labelStyle}>Name *</label>
                    <input type="text" value={formData.name}
                      onChange={e => updateField('name', e.target.value)}
                      style={{ ...inputStyle, borderColor: formErrors.name ? '#ef4444' : 'rgba(255,255,255,0.1)' }}
                      placeholder="Vollständiger Name" />
                  </div>
                  <div>
                    <label style={labelStyle}>E-Mail *</label>
                    <input type="email" value={formData.email}
                      onChange={e => updateField('email', e.target.value)}
                      style={{ ...inputStyle, borderColor: formErrors.email ? '#ef4444' : 'rgba(255,255,255,0.1)' }}
                      placeholder="ihre@email.de" />
                  </div>
                </div>
                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={labelStyle}>Telefon (optional)</label>
                    <input type="tel" value={formData.telefon}
                      onChange={e => updateField('telefon', e.target.value)}
                      style={inputStyle} placeholder="+49 ..." />
                  </div>
                  <div>
                    <label style={labelStyle}>Betreff</label>
                    <select value={formData.betreff}
                      onChange={e => updateField('betreff', e.target.value)}
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
                    onChange={e => updateField('nachricht', e.target.value)}
                    style={{ ...inputStyle, minHeight: 130, resize: 'vertical', borderColor: formErrors.nachricht ? '#ef4444' : 'rgba(255,255,255,0.1)' }}
                    placeholder="Beschreiben Sie kurz Ihr Anliegen..." />
                </div>
                <button type="submit" style={{
                  ...btnStyle, width: '100%', textAlign: 'center',
                  background: GOLD, color: DARK, border: 'none',
                  fontSize: 15, padding: '16px 0', fontWeight: 600,
                }}>Nachricht senden</button>
                {Object.values(formErrors).some(Boolean) && (
                  <p style={{ color: '#ef4444', fontSize: 13, marginTop: 12, textAlign: 'center' }}>Bitte füllen Sie alle Pflichtfelder korrekt aus.</p>
                )}
              </form>
            )}
          </Reveal>

          <Reveal delay={0.2}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={infoCardStyle}>
                <h4 style={infoTitleStyle}>Direkter Kontakt</h4>
                {CONTACT_PERSONS.map((c, i) => (
                  <div key={i} style={{ marginBottom: i < CONTACT_PERSONS.length - 1 ? 14 : 0 }}>
                    <p style={{ fontSize: 13, color: TEXT_SECONDARY, marginBottom: 3 }}>{c.name} — {c.role}</p>
                    <a href={`tel:${c.tel.replace(/\s/g, '')}`} style={{ color: TEXT_PRIMARY, textDecoration: 'none', fontSize: 15, fontWeight: 500 }}>{c.tel}</a>
                  </div>
                ))}
              </div>
              <div style={infoCardStyle}>
                <h4 style={infoTitleStyle}>Standort</h4>
                <p style={{ color: TEXT_BODY, fontSize: 15, lineHeight: 1.75 }}>{COMPANY_INFO.name} ({COMPANY_INFO.legalName})<br />{COMPANY_INFO.street}<br />{COMPANY_INFO.city}, {COMPANY_INFO.country}</p>
              </div>
              <div style={infoCardStyle}>
                <h4 style={infoTitleStyle}>E-Mail</h4>
                <a href={`mailto:${COMPANY_INFO.email}`} style={{ color: TEXT_PRIMARY, textDecoration: 'none', fontSize: 16, fontWeight: 500 }}>{COMPANY_INFO.email}</a>
                <p style={{ fontSize: 12, color: TEXT_SECONDARY, marginTop: 8 }}>Antwort i.d.R. innerhalb von 24h</p>
              </div>
              <div style={{ padding: '16px 20px', background: `${GOLD}04`, borderRadius: 12, border: `1px solid ${GOLD}10` }}>
                <p style={{ fontFamily: MONO, fontSize: 11, color: TEXT_SECONDARY, lineHeight: 1.7 }}>USt-IdNr: {COMPANY_INFO.ustIdNr} · StNr: {COMPANY_INFO.stNr}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
