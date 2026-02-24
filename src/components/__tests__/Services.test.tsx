import { render, screen, within, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NavigationProvider } from '@/context/NavigationContext'
import { Services } from '../Services'

vi.mock('@/hooks/useInView', () => ({
  useInView: () => [{ current: null }, true],
  _resetObservers: vi.fn(),
}))

function renderServices() {
  return render(
    <NavigationProvider>
      <Services />
    </NavigationProvider>,
  )
}

describe('Services', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  // ─── Rendering ───
  it('renders section with correct id', () => {
    renderServices()
    expect(document.getElementById('leistungen')).toBeInTheDocument()
  })

  it('renders all three service tabs', () => {
    renderServices()
    const tablist = screen.getByRole('tablist')
    const tabs = within(tablist).getAllByRole('tab')
    expect(tabs).toHaveLength(3)
  })

  it('renders first tab as selected by default', () => {
    renderServices()
    const tabs = screen.getAllByRole('tab')
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false')
    expect(tabs[2]).toHaveAttribute('aria-selected', 'false')
  })

  it('renders tab panel with content', () => {
    renderServices()
    const panel = screen.getByRole('tabpanel')
    expect(panel).toBeInTheDocument()
  })

  // ─── Tab Switching ───
  it('switches content when clicking a different tab', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    renderServices()

    const tabs = screen.getAllByRole('tab')
    await user.click(tabs[1]!)

    // switchTab has a 200ms setTimeout before setActiveService
    act(() => { vi.advanceTimersByTime(200) })

    expect(tabs[1]).toHaveAttribute('aria-selected', 'true')
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false')
  })

  // ─── Keyboard Navigation ───
  it('moves focus with ArrowRight/ArrowLeft', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    renderServices()

    const tabs = screen.getAllByRole('tab')
    await user.click(tabs[0]!)

    await user.keyboard('{ArrowRight}')
    expect(document.activeElement).toBe(tabs[1])

    await user.keyboard('{ArrowLeft}')
    expect(document.activeElement).toBe(tabs[0])
  })

  it('wraps around with ArrowRight from last tab', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    renderServices()

    const tabs = screen.getAllByRole('tab')
    // Activate last tab first
    await user.click(tabs[2]!)
    act(() => { vi.advanceTimersByTime(200) })

    tabs[2]!.focus()
    await user.keyboard('{ArrowRight}')
    expect(document.activeElement).toBe(tabs[0])
  })

  it('moves to first/last with Home/End', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    renderServices()

    const tabs = screen.getAllByRole('tab')
    // Activate middle tab
    await user.click(tabs[1]!)
    act(() => { vi.advanceTimersByTime(200) })

    tabs[1]!.focus()
    await user.keyboard('{Home}')
    expect(document.activeElement).toBe(tabs[0])

    await user.keyboard('{End}')
    expect(document.activeElement).toBe(tabs[2])
  })

  // ─── ARIA ───
  it('tabs have aria-controls matching panel id', () => {
    renderServices()
    const tabs = screen.getAllByRole('tab')
    const panel = screen.getByRole('tabpanel')
    expect(tabs[0]).toHaveAttribute('aria-controls', panel.id)
  })

  it('only active tab has tabIndex 0', () => {
    renderServices()
    const tabs = screen.getAllByRole('tab')
    expect(tabs[0]).toHaveAttribute('tabindex', '0')
    expect(tabs[1]).toHaveAttribute('tabindex', '-1')
    expect(tabs[2]).toHaveAttribute('tabindex', '-1')
  })

  it('panel has aria-live for screen readers', () => {
    renderServices()
    const panel = screen.getByRole('tabpanel')
    expect(panel).toHaveAttribute('aria-live', 'polite')
  })
})
