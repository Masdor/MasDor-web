import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Portfolio } from '../Portfolio'
import { PROJECTS_META } from '@/data/projects'
import portfolioTranslations from '@/locales/de/portfolio.json'

vi.mock('@/hooks/useInView', () => ({
  useInView: () => [{ current: null }, true],
  _resetObservers: vi.fn(),
}))

describe('Portfolio', () => {
  // ─── Rendering ───
  it('renders section with correct id', () => {
    render(<Portfolio />)
    expect(document.getElementById('referenzen')).toBeInTheDocument()
  })

  it('renders all projects by default (filter: Alle)', () => {
    render(<Portfolio />)
    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(PROJECTS_META.length)
  })

  it('renders filter buttons', () => {
    render(<Portfolio />)
    const toolbar = screen.getByRole('toolbar')
    expect(toolbar).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Alle' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Medical' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Industrial' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'IT' })).toBeInTheDocument()
  })

  // ─── Filtering ───
  it('filters to Medical projects', async () => {
    const user = userEvent.setup()
    render(<Portfolio />)

    await user.click(screen.getByRole('button', { name: 'Medical' }))

    const medicalCount = PROJECTS_META.filter(p => p.category === 'medical').length
    expect(screen.getAllByRole('listitem')).toHaveLength(medicalCount)
    expect(screen.getByRole('button', { name: 'Medical' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('filters to IT projects', async () => {
    const user = userEvent.setup()
    render(<Portfolio />)

    await user.click(screen.getByRole('button', { name: 'IT' }))
    const itCount = PROJECTS_META.filter(p => p.category === 'it').length
    expect(screen.getAllByRole('listitem')).toHaveLength(itCount)
  })

  it('returns to all projects when clicking Alle', async () => {
    const user = userEvent.setup()
    render(<Portfolio />)

    // Filter to Medical
    await user.click(screen.getByRole('button', { name: 'Medical' }))
    // Back to Alle
    await user.click(screen.getByRole('button', { name: 'Alle' }))

    expect(screen.getAllByRole('listitem')).toHaveLength(PROJECTS_META.length)
  })

  // ─── Detail Modal ───
  it('opens detail modal when clicking a project card', async () => {
    const user = userEvent.setup()
    render(<Portfolio />)

    const firstCard = screen.getAllByRole('button', { name: /Details anzeigen/ })[0]!
    await user.click(firstCard)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true')
  })

  it('closes modal with close button', async () => {
    const user = userEvent.setup()
    render(<Portfolio />)

    // Open
    await user.click(screen.getAllByRole('button', { name: /Details anzeigen/ })[0]!)
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    // Close
    await user.click(screen.getByRole('button', { name: 'Schließen' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes modal with Escape key', async () => {
    const user = userEvent.setup()
    render(<Portfolio />)

    await user.click(screen.getAllByRole('button', { name: /Details anzeigen/ })[0]!)
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('shows project details in modal', async () => {
    const user = userEvent.setup()
    render(<Portfolio />)

    const firstProjectTranslation = portfolioTranslations.items[0]!
    await user.click(screen.getAllByRole('button', { name: /Details anzeigen/ })[0]!)

    const dialog = screen.getByRole('dialog')
    expect(within(dialog).getByText(firstProjectTranslation.title)).toBeInTheDocument()
    expect(within(dialog).getByText(firstProjectTranslation.description)).toBeInTheDocument()
  })
})
