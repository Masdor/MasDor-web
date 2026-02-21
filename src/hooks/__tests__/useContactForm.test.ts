import { renderHook, act } from '@testing-library/react'
import { useContactForm } from '../useContactForm'

describe('useContactForm', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns initial empty state', () => {
    const { result } = renderHook(() => useContactForm())
    expect(result.current.formData.name).toBe('')
    expect(result.current.formData.email).toBe('')
    expect(result.current.formData.nachricht).toBe('')
    expect(result.current.formData.betreff).toBe('Allgemeine Anfrage')
    expect(result.current.formSent).toBe(false)
    expect(result.current.formErrors).toEqual({})
  })

  it('updates a field', () => {
    const { result } = renderHook(() => useContactForm())
    act(() => result.current.updateField('name', 'Max'))
    expect(result.current.formData.name).toBe('Max')
  })

  it('clears field error on update', () => {
    const { result } = renderHook(() => useContactForm())

    // trigger validation to get errors
    act(() => {
      result.current.handleSubmit({ preventDefault: () => {} } as React.FormEvent)
    })
    expect(result.current.formErrors.name).toBeTruthy()

    // updating the field should clear its error
    act(() => result.current.updateField('name', 'Max'))
    expect(result.current.formErrors.name).toBeUndefined()
  })

  it('validates required fields', () => {
    const { result } = renderHook(() => useContactForm())
    act(() => {
      result.current.handleSubmit({ preventDefault: () => {} } as React.FormEvent)
    })
    expect(result.current.formErrors.name).toBeTruthy()
    expect(result.current.formErrors.email).toBeTruthy()
    expect(result.current.formErrors.nachricht).toBeTruthy()
    expect(result.current.formSent).toBe(false)
  })

  it('validates email format with regex', () => {
    const { result } = renderHook(() => useContactForm())
    act(() => result.current.updateField('name', 'Max'))
    act(() => result.current.updateField('email', 'invalid'))
    act(() => result.current.updateField('nachricht', 'Hello'))
    act(() => {
      result.current.handleSubmit({ preventDefault: () => {} } as React.FormEvent)
    })
    expect(result.current.formErrors.email).toBeTruthy()
    expect(result.current.formErrors.name).toBeUndefined()
    expect(result.current.formErrors.nachricht).toBeUndefined()
  })

  it('accepts valid email', () => {
    const { result } = renderHook(() => useContactForm())
    act(() => result.current.updateField('name', 'Max'))
    act(() => result.current.updateField('email', 'max@example.de'))
    act(() => result.current.updateField('nachricht', 'Hello'))
    act(() => {
      result.current.handleSubmit({ preventDefault: () => {} } as React.FormEvent)
    })
    expect(result.current.formErrors).toEqual({})
    expect(result.current.formSent).toBe(true)
  })

  it('resets sent state after 5 seconds', () => {
    const { result } = renderHook(() => useContactForm())
    act(() => result.current.updateField('name', 'Max'))
    act(() => result.current.updateField('email', 'max@example.de'))
    act(() => result.current.updateField('nachricht', 'Hello'))
    act(() => {
      result.current.handleSubmit({ preventDefault: () => {} } as React.FormEvent)
    })
    expect(result.current.formSent).toBe(true)

    act(() => { vi.advanceTimersByTime(5000) })
    expect(result.current.formSent).toBe(false)
  })

  it('provides string error messages', () => {
    const { result } = renderHook(() => useContactForm())
    act(() => {
      result.current.handleSubmit({ preventDefault: () => {} } as React.FormEvent)
    })
    expect(typeof result.current.formErrors.name).toBe('string')
    expect(typeof result.current.formErrors.email).toBe('string')
    expect(typeof result.current.formErrors.nachricht).toBe('string')
  })
})
