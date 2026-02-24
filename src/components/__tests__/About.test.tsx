import { render, screen } from '@testing-library/react'
import { About } from '../About'
import { TEAM_MEMBERS } from '@/data/team'

vi.mock('@/hooks/useInView', () => ({
  useInView: () => [{ current: null }, true],
  _resetObservers: vi.fn(),
}))

describe('About', () => {
  it('renders section with correct id', () => {
    render(<About />)
    expect(document.getElementById('about')).toBeInTheDocument()
  })

  it('renders section title', () => {
    render(<About />)
    expect(screen.getByText('Engineering mit Verantwortung')).toBeInTheDocument()
  })

  it('renders value cards', () => {
    render(<About />)
    expect(screen.getByText('Unser Anspruch')).toBeInTheDocument()
    expect(screen.getByText('Unsere Stärke')).toBeInTheDocument()
    expect(screen.getByText('Unser Versprechen')).toBeInTheDocument()
  })

  it('renders team members', () => {
    render(<About />)
    for (const m of TEAM_MEMBERS) {
      expect(screen.getByText(m.name)).toBeInTheDocument()
      expect(screen.getByText(m.initials)).toBeInTheDocument()
    }
  })
})
