import { Reveal } from '@/components/ui/Reveal'
import { useContactForm } from '@/hooks/useContactForm'
import { CONTACT_PERSONS, COMPANY_INFO } from '@/data/team'
import shared from '@/styles/shared.module.css'
import styles from './Contact.module.css'

export function Contact() {
  const { formData, formErrors, formSent, updateField, handleSubmit } = useContactForm()

  return (
    <section id="kontakt" className={`${shared.sectionDark} ${styles.sectionKontakt}`}>
      <div className={shared.containerNarrow}>
        <Reveal>
          <div className={shared.sectionHeader}>
            <span className={shared.tagBadge}>KONTAKT</span>
            <h2 className={shared.sectionTitle}>Sprechen Sie mit uns</h2>
            <p className={shared.subtitleCentered}>Ob technische Anfrage, Projektbesprechung oder allgemeine Frage – wir melden uns zeitnah.</p>
          </div>
        </Reveal>

        <div className={styles.grid}>
          <Reveal delay={0.1}>
            {formSent ? (
              <div className={styles.success}>
                <div className={styles.successIcon}>✓</div>
                <h3 className={styles.successTitle}>Nachricht gesendet</h3>
                <p className={styles.successText}>Wir melden uns in der Regel innerhalb von 24 Stunden.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form} noValidate>
                <div className={styles.formRow}>
                  <div>
                    <label htmlFor="contact-name" className={shared.label}>Name *</label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={e => updateField('name', e.target.value)}
                      className={`${shared.input} ${formErrors.name ? shared.inputError : ''}`}
                      placeholder="Vollständiger Name"
                      aria-required="true"
                      aria-invalid={!!formErrors.name || undefined}
                      aria-describedby={formErrors.name ? 'error-name' : undefined}
                    />
                    {formErrors.name && <p id="error-name" className={styles.fieldError} role="alert">{formErrors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className={shared.label}>E-Mail *</label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={e => updateField('email', e.target.value)}
                      className={`${shared.input} ${formErrors.email ? shared.inputError : ''}`}
                      placeholder="ihre@email.de"
                      aria-required="true"
                      aria-invalid={!!formErrors.email || undefined}
                      aria-describedby={formErrors.email ? 'error-email' : undefined}
                    />
                    {formErrors.email && <p id="error-email" className={styles.fieldError} role="alert">{formErrors.email}</p>}
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div>
                    <label htmlFor="contact-telefon" className={shared.label}>Telefon (optional)</label>
                    <input
                      id="contact-telefon"
                      type="tel"
                      value={formData.telefon}
                      onChange={e => updateField('telefon', e.target.value)}
                      className={shared.input}
                      placeholder="+49 ..."
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-betreff" className={shared.label}>Betreff</label>
                    <select
                      id="contact-betreff"
                      value={formData.betreff}
                      onChange={e => updateField('betreff', e.target.value)}
                      className={shared.input}
                    >
                      <option>Allgemeine Anfrage</option>
                      <option>Medical Systems</option>
                      <option>Industrial Systems</option>
                      <option>IT Infrastructure</option>
                      <option>Projektbesprechung</option>
                    </select>
                  </div>
                </div>
                <div className={styles.messageField}>
                  <label htmlFor="contact-nachricht" className={shared.label}>Nachricht *</label>
                  <textarea
                    id="contact-nachricht"
                    value={formData.nachricht}
                    onChange={e => updateField('nachricht', e.target.value)}
                    className={`${shared.input} ${styles.textarea} ${formErrors.nachricht ? shared.inputError : ''}`}
                    placeholder="Beschreiben Sie kurz Ihr Anliegen..."
                    aria-required="true"
                    aria-invalid={!!formErrors.nachricht || undefined}
                    aria-describedby={formErrors.nachricht ? 'error-nachricht' : undefined}
                  />
                  {formErrors.nachricht && <p id="error-nachricht" className={styles.fieldError} role="alert">{formErrors.nachricht}</p>}
                </div>
                <button type="submit" className={`${shared.btnPrimary} ${shared.btnFull}`}>
                  Nachricht senden
                </button>
                {Object.values(formErrors).some(Boolean) && (
                  <p className={styles.formError} role="alert">Bitte füllen Sie alle Pflichtfelder korrekt aus.</p>
                )}
              </form>
            )}
          </Reveal>

          <Reveal delay={0.2}>
            <div className={styles.infoStack}>
              <div className={styles.infoCard}>
                <h4 className={styles.infoTitle}>Direkter Kontakt</h4>
                {CONTACT_PERSONS.map((c, i) => (
                  <div key={i} className={styles.contactPerson}>
                    <p className={styles.contactName}>{c.name} — {c.role}</p>
                    <a href={`tel:${c.tel.replace(/\s/g, '')}`} className={styles.contactTel}>{c.tel}</a>
                  </div>
                ))}
              </div>
              <div className={styles.infoCard}>
                <h4 className={styles.infoTitle}>Standort</h4>
                <p className={styles.locationText}>{COMPANY_INFO.name} ({COMPANY_INFO.legalName})<br />{COMPANY_INFO.street}<br />{COMPANY_INFO.city}, {COMPANY_INFO.country}</p>
              </div>
              <div className={styles.infoCard}>
                <h4 className={styles.infoTitle}>E-Mail</h4>
                <a href={`mailto:${COMPANY_INFO.email}`} className={styles.emailLink}>{COMPANY_INFO.email}</a>
                <p className={styles.emailNote}>Antwort i.d.R. innerhalb von 24h</p>
              </div>
              <div className={styles.taxInfo}>
                <p className={styles.taxText}>USt-IdNr: {COMPANY_INFO.ustIdNr} · StNr: {COMPANY_INFO.stNr}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
