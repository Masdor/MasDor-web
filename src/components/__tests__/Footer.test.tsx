import { render, screen } from '@testing-library/react'
import { NavigationProvider } from '@/context/NavigationContext'
import { Footer } from '../Footer'

function renderFooter() {
  return render(
    <NavigationProvider>
      <Footer />
    </NavigationProvider>,
  )
}

describe('Footer', () => {
  it('renders footer element', () => {
    renderFooter()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders brand name LR', () => {
    renderFooter()
    expect(screen.getByText('LR')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    renderFooter()
    const nav = screen.getByRole('navigation', { name: 'Footer Navigation' })
    const buttons = nav.querySelectorAll('button')
    expect(buttons).toHaveLength(6)
  })

  it('renders legal links', () => {
    renderFooter()
    expect(screen.getByText('Impressum')).toBeInTheDocument()
    expect(screen.getByText('Datenschutz')).toBeInTheDocument()
  })

  it('renders copyright with current year', () => {
    renderFooter()
    const year = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument()
  })
})
