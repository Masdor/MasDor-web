import { render, screen } from '@testing-library/react'
import { HoverCard } from '../HoverCard'

describe('HoverCard', () => {
  it('renders children', () => {
    render(<HoverCard><p>Card content</p></HoverCard>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('applies glow class when glowOnHover is true', () => {
    render(<HoverCard glowOnHover><p>Glow</p></HoverCard>)
    const card = screen.getByText('Glow').parentElement!
    expect(card.className).toContain('cardGlow')
  })

  it('does not apply glow class by default', () => {
    render(<HoverCard><p>No glow</p></HoverCard>)
    const card = screen.getByText('No glow').parentElement!
    expect(card.className).not.toContain('cardGlow')
  })

  it('applies custom className', () => {
    render(<HoverCard className="my-class"><p>Test</p></HoverCard>)
    const card = screen.getByText('Test').parentElement!
    expect(card.className).toContain('my-class')
  })

  it('sets accent color CSS variable', () => {
    render(<HoverCard accentColor="#ff0000"><p>Accent</p></HoverCard>)
    const card = screen.getByText('Accent').parentElement!
    expect(card.style.getPropertyValue('--accent')).toBe('#ff0000')
  })
})
