import { render, screen } from '@testing-library/react'
import { Process } from '../Process'
import processTranslations from '@/locales/de/process.json'

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
    for (const item of processTranslations.items) {
      expect(screen.getByText(item.title)).toBeInTheDocument()
    }
  })

  it('renders step numbers', () => {
    render(<Process />)
    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText('05')).toBeInTheDocument()
  })

  it('renders step descriptions', () => {
    render(<Process />)
    for (const item of processTranslations.items) {
      expect(screen.getByText(item.desc)).toBeInTheDocument()
    }
  })
})
