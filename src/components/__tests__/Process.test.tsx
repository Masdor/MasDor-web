import { render, screen } from '@testing-library/react'
import { Process } from '../Process'
import { PROCESS_STEPS } from '@/data/process'

vi.mock('@/hooks/useInView', () => ({
  useInView: () => [{ current: null }, true],
  _resetObservers: vi.fn(),
}))

describe('Process', () => {
  it('renders section with correct id', () => {
    render(<Process />)
    expect(document.getElementById('methode')).toBeInTheDocument()
  })

  it('renders section title', () => {
    render(<Process />)
    expect(screen.getByText('Strukturiert statt reaktiv')).toBeInTheDocument()
  })

  it('renders all process steps', () => {
    render(<Process />)
    for (const step of PROCESS_STEPS) {
      expect(screen.getByText(step.title)).toBeInTheDocument()
    }
  })

  it('renders step numbers', () => {
    render(<Process />)
    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText('05')).toBeInTheDocument()
  })

  it('renders step descriptions', () => {
    render(<Process />)
    for (const step of PROCESS_STEPS) {
      expect(screen.getByText(step.desc)).toBeInTheDocument()
    }
  })
})
