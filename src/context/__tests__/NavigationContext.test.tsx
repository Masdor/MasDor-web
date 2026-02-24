import { render, screen } from '@testing-library/react'
import { NavigationProvider } from '../NavigationContext'
import { useNavigation } from '../useNavigation'

function TestConsumer() {
  const { scrolled, activeSection, showBackToTop, menuOpen } = useNavigation()
  return (
    <div>
      <span data-testid="scrolled">{String(scrolled)}</span>
      <span data-testid="active">{activeSection}</span>
      <span data-testid="back-to-top">{String(showBackToTop)}</span>
      <span data-testid="menu-open">{String(menuOpen)}</span>
    </div>
  )
}

describe('NavigationContext', () => {
  it('provides initial values', () => {
    render(
      <NavigationProvider>
        <TestConsumer />
      </NavigationProvider>,
    )
    expect(screen.getByTestId('scrolled').textContent).toBe('false')
    expect(screen.getByTestId('active').textContent).toBe('home')
    expect(screen.getByTestId('back-to-top').textContent).toBe('false')
    expect(screen.getByTestId('menu-open').textContent).toBe('false')
  })

  it('throws when used outside provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<TestConsumer />)).toThrow('useNavigation must be used within NavigationProvider')
    spy.mockRestore()
  })
})
