import { renderHook, act } from '@testing-library/react'
import { useCounter } from '../useCounter'

describe('useCounter', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns 0 when not triggered', () => {
    const { result } = renderHook(() => useCounter(100, 1000, false))
    expect(result.current).toBe(0)
  })

  it('counts up to end value when triggered', () => {
    const { result } = renderHook(() => useCounter(100, 1000, true))

    // Advance time past the full duration
    act(() => { vi.advanceTimersByTime(1100) })
    expect(result.current).toBe(100)
  })

  it('resets to 0 when trigger becomes false', () => {
    const { result, rerender } = renderHook(
      ({ trigger }) => useCounter(100, 1000, trigger),
      { initialProps: { trigger: true } },
    )

    act(() => { vi.advanceTimersByTime(1100) })
    expect(result.current).toBe(100)

    rerender({ trigger: false })
    expect(result.current).toBe(0)
  })

  it('returns intermediate values during animation', () => {
    const { result } = renderHook(() => useCounter(100, 1000, true))

    // At ~50% duration, value should be around 50
    act(() => { vi.advanceTimersByTime(500) })
    expect(result.current).toBeGreaterThan(30)
    expect(result.current).toBeLessThanOrEqual(100)
  })
})
