import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CookieConsent } from '../CookieConsent'

const STORAGE_KEY = 'lab-root-cookie-consent'

beforeEach(() => {
  localStorage.clear()
  vi.useFakeTimers({ shouldAdvanceTime: true })
})

afterEach(() => {
  vi.useRealTimers()
})

describe('CookieConsent', () => {
  it('renders banner when no consent is stored', () => {
    render(<CookieConsent />)
    expect(screen.getByRole('dialog', { name: 'Cookie-Einstellungen' })).toBeInTheDocument()
  })

  it('renders nothing when consent is already stored', () => {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    const { container } = render(<CookieConsent />)
    expect(container.innerHTML).toBe('')
  })

  it('stores "accepted" and animates out on accept', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<CookieConsent />)

    await user.click(screen.getByText('Akzeptieren'))
    expect(localStorage.getItem(STORAGE_KEY)).toBe('accepted')

    // Banner should have the hidden class during animation
    expect(screen.getByRole('dialog')).toHaveClass(/bannerHidden/)

    // After the animation timeout, banner should be removed
    act(() => { vi.advanceTimersByTime(400) })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('stores "rejected" and animates out on reject', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<CookieConsent />)

    await user.click(screen.getByText('Ablehnen'))
    expect(localStorage.getItem(STORAGE_KEY)).toBe('rejected')

    act(() => { vi.advanceTimersByTime(400) })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('has role="dialog" and aria-label', () => {
    render(<CookieConsent />)
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-label', 'Cookie-Einstellungen')
  })

  it('shows link to Datenschutzerklärung', () => {
    render(<CookieConsent />)
    const link = screen.getByText('Datenschutzerklärung')
    expect(link).toBeInTheDocument()
    expect(link.closest('a')).toHaveAttribute('href', '#datenschutz')
  })
})
