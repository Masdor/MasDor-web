import { render, act } from '@testing-library/react'
import { useInView } from '../useInView'
import { useEffect } from 'react'

describe('useInView', () => {
  let capturedCallback: IntersectionObserverCallback
  let capturedOptions: IntersectionObserverInit | undefined
  let mockObserve: ReturnType<typeof vi.fn>
  let mockUnobserve: ReturnType<typeof vi.fn>
  let mockDisconnect: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockObserve = vi.fn()
    mockUnobserve = vi.fn()
    mockDisconnect = vi.fn()

    vi.stubGlobal('IntersectionObserver', class {
      constructor(cb: IntersectionObserverCallback, options?: IntersectionObserverInit) {
        capturedCallback = cb
        capturedOptions = options
      }
      observe = mockObserve
      unobserve = mockUnobserve
      disconnect = mockDisconnect
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
    render(<TestComponent onResult={v => { visible = v }} />)

    act(() => {
      capturedCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      )
    })

    expect(visible).toBe(true)
  })

  it('stays false when not intersecting', () => {
    let visible = false
    render(<TestComponent onResult={v => { visible = v }} />)

    act(() => {
      capturedCallback(
        [{ isIntersecting: false } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      )
    })

    expect(visible).toBe(false)
  })

  it('passes threshold to IntersectionObserver', () => {
    render(<TestComponent threshold={0.5} onResult={() => {}} />)
    expect(capturedOptions).toEqual({ threshold: 0.5 })
  })

  it('unobserves after becoming visible', () => {
    render(<TestComponent onResult={() => {}} />)

    act(() => {
      capturedCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      )
    })

    expect(mockUnobserve).toHaveBeenCalled()
  })
})
