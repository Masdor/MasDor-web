import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Contact } from '../Contact'

describe('Contact', () => {
  it('renders the contact form', () => {
    render(<Contact />)
    expect(screen.getByLabelText(/Name/)).toBeInTheDocument()
    expect(screen.getByLabelText(/E-Mail/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Nachricht/)).toBeInTheDocument()
    expect(screen.getByText('Nachricht senden')).toBeInTheDocument()
  })

  it('shows field-specific errors on empty submit', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    await user.click(screen.getByText('Nachricht senden'))

    expect(screen.getByText(/Bitte geben Sie Ihren Namen ein/)).toBeInTheDocument()
    expect(screen.getByText(/gültige E-Mail/)).toBeInTheDocument()
    expect(screen.getByText(/Bitte geben Sie eine Nachricht ein/)).toBeInTheDocument()
  })

  it('sets aria-invalid on invalid fields', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    await user.click(screen.getByText('Nachricht senden'))

    expect(screen.getByLabelText(/Name/)).toHaveAttribute('aria-invalid', 'true')
  })

  it('sets aria-describedby linking to error messages', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    await user.click(screen.getByText('Nachricht senden'))

    const nameInput = screen.getByLabelText(/Name/)
    const describedBy = nameInput.getAttribute('aria-describedby')
    expect(describedBy).toBeTruthy()
    const errorEl = document.getElementById(describedBy!)
    expect(errorEl).toHaveTextContent(/Name/)
  })

  it('validates on blur', async () => {
    const user = userEvent.setup()
    render(<Contact />)

    const nameInput = screen.getByLabelText(/Name/)
    await user.click(nameInput)
    await user.tab() // blur

    expect(screen.getByText(/Bitte geben Sie Ihren Namen ein/)).toBeInTheDocument()
  })

  it('clears error when field is filled after blur', async () => {
    const user = userEvent.setup()
    render(<Contact />)

    const nameInput = screen.getByLabelText(/Name/)
    await user.click(nameInput)
    await user.tab()
    expect(screen.getByText(/Bitte geben Sie Ihren Namen ein/)).toBeInTheDocument()

    await user.type(nameInput, 'Max')
    expect(screen.queryByText(/Bitte geben Sie Ihren Namen ein/)).not.toBeInTheDocument()
  })

  it('rejects invalid email format', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    await user.type(screen.getByLabelText(/Name/), 'Max')
    await user.type(screen.getByLabelText(/E-Mail/), 'not-an-email')
    await user.type(screen.getByLabelText(/Nachricht/), 'Hello')
    await user.click(screen.getByText('Nachricht senden'))

    expect(screen.getByText(/gültige E-Mail/)).toBeInTheDocument()
  })

  it('shows error message when no API is configured', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    await user.type(screen.getByLabelText(/Name/), 'Max Muster')
    await user.type(screen.getByLabelText(/E-Mail/), 'max@example.de')
    await user.type(screen.getByLabelText(/Nachricht/), 'Testanfrage')
    await user.click(screen.getByText('Nachricht senden'))

    expect(screen.getByText(/Kontaktformular ist derzeit nicht verfügbar/)).toBeInTheDocument()
  })

  it('keeps form visible after submission error', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    await user.type(screen.getByLabelText(/Name/), 'Max Muster')
    await user.type(screen.getByLabelText(/E-Mail/), 'max@example.de')
    await user.type(screen.getByLabelText(/Nachricht/), 'Testanfrage')
    await user.click(screen.getByText('Nachricht senden'))

    expect(screen.getByText('Nachricht senden')).toBeInTheDocument()
    expect(screen.getByLabelText(/Name/)).toHaveValue('Max Muster')
  })

  it('has required fields marked with aria-required', () => {
    render(<Contact />)
    expect(screen.getByLabelText(/Name/)).toHaveAttribute('aria-required', 'true')
    expect(screen.getByLabelText(/E-Mail/)).toHaveAttribute('aria-required', 'true')
    expect(screen.getByLabelText(/Nachricht/)).toHaveAttribute('aria-required', 'true')
  })

  it('renders contact info cards', () => {
    render(<Contact />)
    expect(screen.getByText('Direkter Kontakt')).toBeInTheDocument()
    expect(screen.getByText('Standort')).toBeInTheDocument()
    expect(screen.getByText('E-Mail')).toBeInTheDocument()
  })
})
