import { render, screen } from '@testing-library/react'
import { ErrorBoundary } from '../ErrorBoundary'

function ThrowingChild(): React.ReactNode {
  throw new Error('Test error')
}

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <p>Everything is fine</p>
      </ErrorBoundary>,
    )
    expect(screen.getByText('Everything is fine')).toBeInTheDocument()
  })

  it('shows error message when child throws', () => {
    render(
      <ErrorBoundary>
        <ThrowingChild />
      </ErrorBoundary>,
    )
    expect(screen.getByText('Etwas ist schiefgelaufen')).toBeInTheDocument()
    expect(screen.getByText(/unerwarteter Fehler/)).toBeInTheDocument()
  })

  it('shows shorter message for section variant', () => {
    render(
      <ErrorBoundary variant="section">
        <ThrowingChild />
      </ErrorBoundary>,
    )
    expect(screen.getByText('Inhalte konnten nicht geladen werden.')).toBeInTheDocument()
    expect(screen.queryByText('Etwas ist schiefgelaufen')).not.toBeInTheDocument()
  })

  it('renders reload button', () => {
    render(
      <ErrorBoundary>
        <ThrowingChild />
      </ErrorBoundary>,
    )
    expect(screen.getByRole('button', { name: 'Seite neu laden' })).toBeInTheDocument()
  })

  it('calls componentDidCatch with console.error', () => {
    render(
      <ErrorBoundary>
        <ThrowingChild />
      </ErrorBoundary>,
    )
    expect(console.error).toHaveBeenCalled()
  })
})
