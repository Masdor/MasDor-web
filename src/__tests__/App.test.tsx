import { render, screen } from '@testing-library/react'
import App from '@/App'

vi.mock('@/hooks/useInView', () => ({
  useInView: () => [{ current: null }, true],
  _resetObservers: vi.fn(),
}))

Element.prototype.scrollIntoView = vi.fn()

Object.defineProperty(window, 'matchMedia', {
  value: vi.fn().mockReturnValue({
    matches: false,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  }),
})

HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
  clearRect: vi.fn(),
  beginPath: vi.fn(),
  arc: vi.fn(),
  fill: vi.fn(),
  stroke: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  scale: vi.fn(),
  canvas: { width: 0, height: 0 },
})

describe('App Integration', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(document.querySelector('main')).toBeInTheDocument()
  })

  it('renders Hero section', () => {
    render(<App />)
    expect(document.getElementById('home')).toBeInTheDocument()
  })

  it('renders navigation', () => {
    render(<App />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
