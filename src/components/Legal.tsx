import { COMPANY_INFO } from '@/data/team'
import styles from './Legal.module.css'

interface LegalProps {
  page: 'impressum' | 'datenschutz' | null
  onClose: () => void
}

export function Legal({ page, onClose }: LegalProps) {
  if (!page) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Schließen">×</button>

        {page === 'impressum' ? (
          <>
            <h2 className={styles.title}>Impressum</h2>
            <div className={styles.content}>
              <h3>Angaben gemäß § 5 TMG</h3>
              <p>
                {COMPANY_INFO.legalName}<br />
                {COMPANY_INFO.street}<br />
                {COMPANY_INFO.city}<br />
                {COMPANY_INFO.country}
              </p>

              <h3>Kontakt</h3>
              <p>E-Mail: {COMPANY_INFO.email}</p>

              <h3>Umsatzsteuer-ID</h3>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:<br />
                {COMPANY_INFO.ustIdNr}
              </p>
              <p>Steuernummer: {COMPANY_INFO.stNr}</p>

              <h3>Verantwortlich für den Inhalt</h3>
              <p>
                Mahmoud Baddour, M.Eng.<br />
                {COMPANY_INFO.street}<br />
                {COMPANY_INFO.city}
              </p>

              <h3>Haftungsausschluss</h3>
              <p>
                Die Inhalte dieser Seite wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
                Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
              </p>
            </div>
          </>
        ) : (
          <>
            <h2 className={styles.title}>Datenschutzerklärung</h2>
            <div className={styles.content}>
              <h3>1. Verantwortlicher</h3>
              <p>
                {COMPANY_INFO.legalName}<br />
                {COMPANY_INFO.street}<br />
                {COMPANY_INFO.city}<br />
                E-Mail: {COMPANY_INFO.email}
              </p>

              <h3>2. Erhebung und Speicherung personenbezogener Daten</h3>
              <p>
                Beim Besuch dieser Website werden automatisch Informationen allgemeiner Natur erfasst
                (Server-Logfiles). Diese umfassen den verwendeten Webbrowser, das Betriebssystem,
                den Domainnamen Ihres Internet-Service-Providers sowie ähnliche Informationen.
                Hierbei handelt es sich ausschließlich um Informationen, die keine Rückschlüsse auf
                Ihre Person zulassen.
              </p>

              <h3>3. Kontaktformular</h3>
              <p>
                Wenn Sie uns über das Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben
                aus dem Formular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung
                der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten
                geben wir nicht ohne Ihre Einwilligung weiter.
              </p>

              <h3>4. Cookies</h3>
              <p>
                Diese Website verwendet ausschließlich technisch notwendige Cookies.
                Es werden keine Tracking- oder Analyse-Cookies eingesetzt.
              </p>

              <h3>5. Ihre Rechte</h3>
              <p>
                Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
                Datenübertragbarkeit und Widerspruch. Bitte wenden Sie sich bei Fragen an: {COMPANY_INFO.email}
              </p>

              <p className={styles.disclaimer}>
                Hinweis: Diese Datenschutzerklärung dient als Platzhalter und sollte von einem
                Rechtsanwalt geprüft und an Ihre konkreten Verarbeitungstätigkeiten angepasst werden.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
