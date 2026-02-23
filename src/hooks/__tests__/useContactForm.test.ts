import { renderHook, act } from '@testing-library/react'
import { useContactForm } from '../useContactForm'

describe('useContactForm', () => {
  it('returns initial empty state', () => {
    const { result } = renderHook(() => useContactForm())
    expect(result.current.formData.name).toBe('')
    expect(result.current.formData.email).toBe('')
    expect(result.current.formData.nachricht).toBe('')
    expect(result.current.formData.betreff).toBe('Allgemeine Anfrage')
    expect(result.current.formSent).toBe(false)
    expect(result.current.formSubmitting).toBe(false)
    expect(result.current.formErrors).toEqual({})
  })

  it('updates a field', () => {
    const { result } = renderHook(() => useContactForm())
    act(() => result.current.updateField('name', 'Max'))
    expect(result.current.formData.name).toBe('Max')
  })

  it('validates on blur for touched fields', () => {
    const { result } = renderHook(() => useContactForm())
    act(() => result.current.touchField('name'))
    expect(result.current.formErrors.name).toBeTruthy()
  })

  it('clears field error on update after touch', () => {
    const { result } = renderHook(() => useContactForm())
    act(() => result.current.touchField('name'))
    expect(result.current.formErrors.name).toBeTruthy()

    act(() => result.current.updateField('name', 'Max'))
    expect(result.current.formErrors.name).toBeUndefined()
  })

  it('validates required fields on submit', async () => {
    const { result } = renderHook(() => useContactForm())
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: () => {} } as React.FormEvent)
    })
    expect(result.current.formErrors.name).toBeTruthy()
    expect(result.current.formErrors.email).toBeTruthy()
    expect(result.current.formErrors.nachricht).toBeTruthy()
    expect(result.current.formSent).toBe(false)
  })

  it('validates email format with regex', async () => {
    const { result } = renderHook(() => useContactForm())
    act(() => result.current.updateField('name', 'Max'))
    act(() => result.current.updateField('email', 'invalid'))
    act(() => result.current.updateField('nachricht', 'Hello'))
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: () => {} } as React.FormEvent)
    })
    expect(result.current.formErrors.email).toBeTruthy()
    expect(result.current.formErrors.name).toBeUndefined()
    expect(result.current.formErrors.nachricht).toBeUndefined()
  })

  it('shows error with valid data when no API is configured', async () => {
    const { result } = renderHook(() => useContactForm())
    act(() => result.current.updateField('name', 'Max'))
    act(() => result.current.updateField('email', 'max@example.de'))
    act(() => result.current.updateField('nachricht', 'Hello'))
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: () => {} } as React.FormEvent)
    })
    expect(result.current.formErrors).toEqual({})
    expect(result.current.formSent).toBe(false)
    expect(result.current.submitError).toBeTruthy()
    expect(result.current.formSubmitting).toBe(false)
  })

  it('resets form via reset()', () => {
    const { result } = renderHook(() => useContactForm())
    act(() => result.current.updateField('name', 'Max'))
    act(() => result.current.updateField('email', 'max@example.de'))
    act(() => result.current.updateField('nachricht', 'Hello'))

    act(() => result.current.reset())
    expect(result.current.formSent).toBe(false)
    expect(result.current.formData.name).toBe('')
    expect(result.current.formData.email).toBe('')
    expect(result.current.formData.nachricht).toBe('')
  })

  it('provides string error messages', async () => {
    const { result } = renderHook(() => useContactForm())
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: () => {} } as React.FormEvent)
    })
    expect(typeof result.current.formErrors.name).toBe('string')
    expect(typeof result.current.formErrors.email).toBe('string')
    expect(typeof result.current.formErrors.nachricht).toBe('string')
  })

  it('revalidates on field update after touch', () => {
    const { result } = renderHook(() => useContactForm())
    act(() => result.current.touchField('email'))
    expect(result.current.formErrors.email).toBeTruthy()

    act(() => result.current.updateField('email', 'still-bad'))
    expect(result.current.formErrors.email).toBeTruthy()

    act(() => result.current.updateField('email', 'valid@email.de'))
    expect(result.current.formErrors.email).toBeUndefined()
  })
})
