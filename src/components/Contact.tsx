import { Check } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { useContactForm } from '@/hooks/useContactForm'
import { CONTACT_PERSONS, COMPANY_INFO } from '@/data/team'
import shared from '@/styles/shared.module.css'
import styles from './Contact.module.css'

export function Contact() {
  const {
    formData, formErrors, formSent, formSubmitting, submitError,
    honeypot, setHoneypot,
    updateField, touchField, handleSubmit, reset,
  } = useContactForm()

  return (
    <section id="kontakt" className={`${shared.section} ${shared.sectionDark} ${styles.sectionKontakt}`}>
      <div className={shared.containerNarrow}>
        <Reveal>
          <div className={shared.sectionHeader}>
            <span className={shared.tagBadge}>KONTAKT</span>
            <h2 className={shared.sectionTitle}>Sprechen Sie mit uns</h2>
            <p className={`${shared.subtitle} ${shared.subtitleCentered}`}>Ob technische Anfrage, Projektbesprechung oder allgemeine Frage – wir melden uns zeitnah.</p>
          </div>
        </Reveal>

        <div className={styles.grid}>
          <Reveal delay={0.1} direction="left">
            {formSent ? (
              <div className={styles.success}>
                <div className={styles.successIcon}>
                  <Check size={36} strokeWidth={2.5} />
                </div>
                <h3 className={styles.successTitle}>Nachricht gesendet</h3>
                <p className={styles.successText}>Wir melden uns in der Regel innerhalb von 24 Stunden.</p>
                <button type="button" onClick={reset} className={styles.resetBtn}>
                  Neue Nachricht senden
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form} noValidate>
                <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}>
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={e => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <div className={styles.formRow}>
                  <div>
                    <label htmlFor="contact-name" className={shared.label}>Name *</label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={e => updateField('name', e.target.value)}
                      onBlur={() => touchField('name')}
                      className={`${shared.input} ${formErrors.name ? shared.inputError : ''}`}
                      placeholder="Vollständiger Name"
                      aria-required="true"
                      aria-invalid={!!formErrors.name}
                      aria-describedby={formErrors.name ? 'error-name' : undefined}
                      disabled={formSubmitting}
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
                      onBlur={() => touchField('email')}
                      className={`${shared.input} ${formErrors.email ? shared.inputError : ''}`}
                      placeholder="ihre@email.de"
                      aria-required="true"
                      aria-invalid={!!formErrors.email}
                      aria-describedby={formErrors.email ? 'error-email' : undefined}
                      disabled={formSubmitting}
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
                      disabled={formSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-betreff" className={shared.label}>Betreff</label>
                    <select
                      id="contact-betreff"
                      value={formData.betreff}
                      onChange={e => updateField('betreff', e.target.value)}
                      className={`${shared.input} ${shared.select}`}
                      disabled={formSubmitting}
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
                    onBlur={() => touchField('nachricht')}
                    className={`${shared.input} ${styles.textarea} ${formErrors.nachricht ? shared.inputError : ''}`}
                    placeholder="Beschreiben Sie kurz Ihr Anliegen..."
                    aria-required="true"
                    aria-invalid={!!formErrors.nachricht}
                    aria-describedby={formErrors.nachricht ? 'error-nachricht' : undefined}
                    disabled={formSubmitting}
                  />
                  {formErrors.nachricht && <p id="error-nachricht" className={styles.fieldError} role="alert">{formErrors.nachricht}</p>}
                </div>
                <button
                  type="submit"
                  className={`${shared.btn} ${shared.btnPrimary} ${shared.btnFull}`}
                  disabled={formSubmitting}
                  aria-busy={formSubmitting || undefined}
                >
                  {formSubmitting ? <><span className={styles.spinner} aria-hidden="true" />Wird gesendet…</> : 'Nachricht senden'}
                </button>
                {submitError && (
                  <p className={styles.formError} role="alert">
                    {submitError.includes('info@lab-root.com')
                      ? <>Kontaktformular ist derzeit nicht verfügbar. Bitte kontaktieren Sie uns direkt per E-Mail an{' '}
                          <a href={`mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(formData.betreff)}`} className={styles.errorLink}>{COMPANY_INFO.email}</a>.</>
                      : submitError}
                  </p>
                )}
                {!submitError && Object.values(formErrors).some(Boolean) && (
                  <p className={styles.formError} role="alert">Bitte füllen Sie alle Pflichtfelder korrekt aus.</p>
                )}
              </form>
            )}
          </Reveal>

          <Reveal delay={0.2} direction="right">
            <div className={styles.infoStack}>
              <div className={styles.infoCard}>
                <h4 className={styles.infoTitle}>Direkter Kontakt</h4>
                {CONTACT_PERSONS.map((c) => {
                  const telDisplay = c.tel.join(' ')
                  const telHref = c.tel.join('')
                  return (
                    <div key={c.name} className={styles.contactPerson}>
                      <p className={styles.contactName}>{c.name} — {c.role}</p>
                      <a href={`tel:${telHref}`} className={styles.contactTel}>{telDisplay}</a>
                    </div>
                  )
                })}
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
