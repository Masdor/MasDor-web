import { renderHook, act } from '@testing-library/react'
import { useScrolled } from '../useScrolled'

describe('useScrolled', () => {
  const originalScrollY = Object.getOwnPropertyDescriptor(window, 'scrollY')

  function setScrollY(value: number) {
    Object.defineProperty(window, 'scrollY', { value, writable: true, configurable: true })
  }

  beforeEach(() => {
    vi.useFakeTimers()
    setScrollY(0)
  })

  afterEach(() => {
    vi.useRealTimers()
    if (originalScrollY) {
      Object.defineProperty(window, 'scrollY', originalScrollY)
    }
  })

  it('returns false initially', () => {
    const { result } = renderHook(() => useScrolled(50))
    expect(result.current).toBe(false)
  })

  it('returns true when scrolled past threshold', () => {
    const { result } = renderHook(() => useScrolled(50))

    act(() => {
      setScrollY(100)
      window.dispatchEvent(new Event('scroll'))
      vi.advanceTimersByTime(20)
    })

    expect(result.current).toBe(true)
  })

  it('returns false when scrolled back above threshold', () => {
    setScrollY(100)
    const { result } = renderHook(() => useScrolled(50))

    act(() => {
      setScrollY(100)
      window.dispatchEvent(new Event('scroll'))
      vi.advanceTimersByTime(20)
    })

    act(() => {
      setScrollY(10)
      window.dispatchEvent(new Event('scroll'))
      vi.advanceTimersByTime(20)
    })
    expect(result.current).toBe(false)
  })

  it('respects custom threshold', () => {
    const { result } = renderHook(() => useScrolled(200))

    act(() => {
      setScrollY(150)
      window.dispatchEvent(new Event('scroll'))
      vi.advanceTimersByTime(20)
    })
    expect(result.current).toBe(false)

    act(() => {
      setScrollY(250)
      window.dispatchEvent(new Event('scroll'))
      vi.advanceTimersByTime(20)
    })
    expect(result.current).toBe(true)
  })
})
