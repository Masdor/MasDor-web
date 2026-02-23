import { render, act } from '@testing-library/react'
import { useInView, _resetObservers } from '../useInView'
import { useEffect } from 'react'

describe('useInView', () => {
  let capturedCallback: IntersectionObserverCallback
  let mockObserve: ReturnType<typeof vi.fn>
  let mockUnobserve: ReturnType<typeof vi.fn>

  beforeEach(() => {
    _resetObservers()
    mockObserve = vi.fn()
    mockUnobserve = vi.fn()

    vi.stubGlobal('IntersectionObserver', class {
      constructor(cb: IntersectionObserverCallback, _options?: IntersectionObserverInit) {
        capturedCallback = cb
      }
      observe = mockObserve
      unobserve = mockUnobserve
      disconnect = vi.fn()
      takeRecords = vi.fn().mockReturnValue([])
      root = null
      rootMargin = ''
      thresholds = [] as number[]
    })
  })

  function TestComponent({ threshold = 0.12, onResult }: { threshold?: number; onResult: (visible: boolean) => void }) {
    const [ref, visible] = useInView(threshold)
    useEffect(() => { onResult(visible) }, [visible, onResult])
    return <div ref={ref} data-testid="target" />
  }

  it('starts as not visible', () => {
    let visible = false
    render(<TestComponent onResult={v => { visible = v }} />)
    expect(visible).toBe(false)
  })

  it('calls observe on the element', () => {
    render(<TestComponent onResult={() => {}} />)
    expect(mockObserve).toHaveBeenCalled()
  })

  it('becomes visible when intersection fires', () => {
    let visible = false
    const { getByTestId } = render(<TestComponent onResult={v => { visible = v }} />)
    const el = getByTestId('target')

    act(() => {
      capturedCallback(
        [{ isIntersecting: true, target: el } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver,
      )
    })

    expect(visible).toBe(true)
  })

  it('stays false when not intersecting', () => {
    let visible = false
    const { getByTestId } = render(<TestComponent onResult={v => { visible = v }} />)
    const el = getByTestId('target')

    act(() => {
      capturedCallback(
        [{ isIntersecting: false, target: el } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver,
      )
    })

    expect(visible).toBe(false)
  })

  it('uses provided threshold', () => {
    render(<TestComponent threshold={0.5} onResult={() => {}} />)
    expect(mockObserve).toHaveBeenCalled()
  })

  it('unobserves after becoming visible', () => {
    const { getByTestId } = render(<TestComponent onResult={() => {}} />)
    const el = getByTestId('target')

    act(() => {
      capturedCallback(
        [{ isIntersecting: true, target: el } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver,
      )
    })

    expect(mockUnobserve).toHaveBeenCalled()
  })
})
