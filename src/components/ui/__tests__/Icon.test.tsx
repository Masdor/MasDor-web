import { render } from '@testing-library/react'
import { Icon } from '../Icon'
import { Server } from 'lucide-react'

describe('Icon', () => {
  it('renders an SVG element', () => {
    const { container } = render(<Icon icon={Server} />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('applies default size of 22', () => {
    const { container } = render(<Icon icon={Server} />)
    const svg = container.querySelector('svg')!
    expect(svg.getAttribute('width')).toBe('22')
    expect(svg.getAttribute('height')).toBe('22')
  })

  it('applies custom size', () => {
    const { container } = render(<Icon icon={Server} size={32} />)
    const svg = container.querySelector('svg')!
    expect(svg.getAttribute('width')).toBe('32')
  })

  it('applies className', () => {
    const { container } = render(<Icon icon={Server} className="test-class" />)
    const svg = container.querySelector('svg')!
    expect(svg.classList.contains('test-class')).toBe(true)
  })
})
