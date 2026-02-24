import { render, screen } from '@testing-library/react'
import { Reveal } from '../Reveal'

vi.mock('@/hooks/useInView', () => ({
  useInView: () => [{ current: null }, true],
  _resetObservers: vi.fn(),
}))

describe('Reveal', () => {
  it('renders children', () => {
    render(<Reveal><p>Hello</p></Reveal>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('applies visible class when in view', () => {
    render(<Reveal><p>Content</p></Reveal>)
    const wrapper = screen.getByText('Content').parentElement!
    expect(wrapper.className).toContain('visible')
  })

  it('applies direction class', () => {
    render(<Reveal direction="left"><p>Content</p></Reveal>)
    const wrapper = screen.getByText('Content').parentElement!
    expect(wrapper.className).toContain('dir-left')
  })

  it('sets delay CSS variable', () => {
    render(<Reveal delay={0.5}><p>Content</p></Reveal>)
    const wrapper = screen.getByText('Content').parentElement!
    expect(wrapper.style.getPropertyValue('--delay')).toBe('0.5s')
  })

  it('defaults to up direction', () => {
    render(<Reveal><p>Content</p></Reveal>)
    const wrapper = screen.getByText('Content').parentElement!
    expect(wrapper.className).toContain('dir-up')
  })
})
