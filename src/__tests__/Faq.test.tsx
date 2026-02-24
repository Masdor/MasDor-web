import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Faq } from '@/components/Faq'

vi.mock('@/hooks/useInView', () => ({
  useInView: () => [{ current: null }, true],
  _resetObservers: vi.fn(),
}))

describe('Faq', () => {
  it('renders all questions', () => {
    render(<Faq />)
    expect(screen.getByText('Häufige Fragen')).toBeInTheDocument()
    expect(
      screen.getAllByRole('button').filter(b => b.getAttribute('aria-expanded') !== null).length,
    ).toBeGreaterThanOrEqual(6)
  })

  it('toggles accordion on click', async () => {
    const user = userEvent.setup()
    render(<Faq />)

    const firstTrigger = screen
      .getAllByRole('button')
      .find(b => b.getAttribute('aria-expanded') !== null)!

    expect(firstTrigger).toHaveAttribute('aria-expanded', 'false')

    await user.click(firstTrigger)
    expect(firstTrigger).toHaveAttribute('aria-expanded', 'true')

    await user.click(firstTrigger)
    expect(firstTrigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('only one item open at a time', async () => {
    const user = userEvent.setup()
    render(<Faq />)

    const triggers = screen
      .getAllByRole('button')
      .filter(b => b.getAttribute('aria-expanded') !== null)

    await user.click(triggers[0]!)
    expect(triggers[0]!).toHaveAttribute('aria-expanded', 'true')

    await user.click(triggers[1]!)
    expect(triggers[0]!).toHaveAttribute('aria-expanded', 'false')
    expect(triggers[1]!).toHaveAttribute('aria-expanded', 'true')
  })

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup()
    render(<Faq />)

    const triggers = screen
      .getAllByRole('button')
      .filter(b => b.getAttribute('aria-expanded') !== null)

    triggers[0]!.focus()

    await user.keyboard('{ArrowDown}')
    expect(document.activeElement).toBe(triggers[1]!)

    await user.keyboard('{ArrowUp}')
    expect(document.activeElement).toBe(triggers[0]!)

    triggers[3]!.focus()
    await user.keyboard('{Home}')
    expect(document.activeElement).toBe(triggers[0]!)

    await user.keyboard('{End}')
    expect(document.activeElement).toBe(triggers[triggers.length - 1]!)
  })
})
