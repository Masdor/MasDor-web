import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NavigationProvider } from '@/context/NavigationContext'
import { NAV_LINKS } from '@/data/navigation'
import i18n from '@/i18n'
import { Navbar } from '../Navbar'

function renderNavbar() {
  return render(
    <NavigationProvider>
      <Navbar />
    </NavigationProvider>,
  )
}

describe('Navbar', () => {
  it('renders logo and navigation', () => {
    renderNavbar()
    expect(screen.getByText('LAB-ROOT')).toBeInTheDocument()
    expect(screen.getByText('LR')).toBeInTheDocument()
  })

  it('displays all NAV_LINKS', () => {
    renderNavbar()
    for (const link of NAV_LINKS) {
      const label = i18n.t(link.labelKey)
      expect(screen.getAllByText(label).length).toBeGreaterThanOrEqual(1)
    }
  })

  it('has CTA button "Anfrage senden"', () => {
    renderNavbar()
    expect(screen.getByText('Anfrage senden')).toBeInTheDocument()
  })

  it('mobile toggle has aria-label and aria-expanded', () => {
    renderNavbar()
    const toggle = screen.getByLabelText('Menü öffnen')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('mobile toggle opens menu', async () => {
    const user = userEvent.setup()
    renderNavbar()
    const toggle = screen.getByLabelText('Menü öffnen')

    await user.click(toggle)

    expect(screen.getByLabelText('Menü schließen')).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('navigation', { name: 'Mobile Navigation' })).toBeInTheDocument()
  })
})
