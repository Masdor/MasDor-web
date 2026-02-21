import { render, screen, fireEvent } from '@testing-library/react'
import { Legal } from '../Legal'

describe('Legal', () => {
  const onClose = vi.fn()

  afterEach(() => {
    vi.clearAllMocks()
    document.body.style.overflow = ''
  })

  it('renders nothing when page is null', () => {
    const { container } = render(<Legal page={null} onClose={onClose} />)
    expect(container.innerHTML).toBe('')
  })

  it('renders Impressum content', () => {
    render(<Legal page="impressum" onClose={onClose} />)
    expect(screen.getByText('Impressum')).toBeInTheDocument()
    expect(screen.getByText(/Angaben gemäß/)).toBeInTheDocument()
  })

  it('renders Datenschutz content', () => {
    render(<Legal page="datenschutz" onClose={onClose} />)
    expect(screen.getByText('Datenschutzerklärung')).toBeInTheDocument()
    expect(screen.getByText(/Verantwortlicher/)).toBeInTheDocument()
  })

  it('has role="dialog" and aria-modal', () => {
    render(<Legal page="impressum" onClose={onClose} />)
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
  })

  it('has aria-labelledby pointing to title', () => {
    render(<Legal page="impressum" onClose={onClose} />)
    const dialog = screen.getByRole('dialog')
    const labelledBy = dialog.getAttribute('aria-labelledby')
    expect(labelledBy).toBeTruthy()
    const title = document.getElementById(labelledBy!)
    expect(title).toHaveTextContent('Impressum')
  })

  it('closes on ESC key', () => {
    render(<Legal page="impressum" onClose={onClose} />)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('closes on overlay click', () => {
    render(<Legal page="impressum" onClose={onClose} />)
    // The overlay is the parent of the dialog
    const dialog = screen.getByRole('dialog')
    fireEvent.click(dialog.parentElement!)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not close on modal content click', () => {
    render(<Legal page="impressum" onClose={onClose} />)
    const dialog = screen.getByRole('dialog')
    fireEvent.click(dialog)
    expect(onClose).not.toHaveBeenCalled()
  })

  it('locks body scroll when open', () => {
    render(<Legal page="impressum" onClose={onClose} />)
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('has close button with aria-label', () => {
    render(<Legal page="impressum" onClose={onClose} />)
    const closeBtn = screen.getByLabelText('Schließen')
    expect(closeBtn).toBeInTheDocument()
    fireEvent.click(closeBtn)
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
