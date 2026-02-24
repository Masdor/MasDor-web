import { useRef, useEffect } from 'react'
import styles from './ParticleField.module.css'

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d', { alpha: true })
    if (!ctx) return
    ctx.globalCompositeOperation = 'source-over'

    let raf: number
    let resizeTimer: ReturnType<typeof setTimeout>
    const isMobile = window.innerWidth < 768
    const lowEnd = isMobile && (navigator.hardwareConcurrency ?? 8) <= 4

    const particleCount = isMobile ? (lowEnd ? 6 : 12) : 35
    const connectionDist = isMobile ? 80 : 110
    const connectionDistSq = connectionDist * connectionDist
    const FRAME_INTERVAL = isMobile ? 33.33 : 0

    let prevW = c.offsetWidth
    let prevH = c.offsetHeight
    let isVisible = true
    let isTabActive = true
    let running = false
    let lastFrameTime = 0

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * prevW,
      y: Math.random() * prevH,
      r: Math.random() * 1.4 + 0.3,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.18,
      a: Math.random() * 0.25 + 0.05,
    }))

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2)
      const newW = c.offsetWidth
      const newH = c.offsetHeight

      if (prevW > 0 && prevH > 0) {
        const scaleX = newW / prevW
        const scaleY = newH / prevH
        for (const p of particles) {
          p.x *= scaleX
          p.y *= scaleY
        }
      }

      c.width = newW * dpr
      c.height = newH * dpr
      ctx.scale(dpr, dpr)

      prevW = newW
      prevH = newH
    }
    resize()

    const debouncedResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 150)
    }
    window.addEventListener('resize', debouncedResize)

    const draw = (now: DOMHighResTimeStamp) => {
      if (FRAME_INTERVAL > 0) {
        if (now - lastFrameTime < FRAME_INTERVAL) {
          raf = requestAnimationFrame(draw)
          return
        }
        lastFrameTime = now
      }

      const lw = prevW
      const lh = prevH
      ctx.clearRect(0, 0, lw, lh)

      for (const p of particles) {
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0) p.x = lw
        if (p.x > lw) p.x = 0
        if (p.y < 0) p.y = lh
        if (p.y > lh) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(207,169,86,${p.a})`
        ctx.fill()
      }

      for (let i = 0; i < particles.length; i++) {
        const pi = particles[i]!
        for (let j = i + 1; j < particles.length; j++) {
          const pj = particles[j]!
          const dx = pi.x - pj.x
          if (dx > connectionDist || dx < -connectionDist) continue
          const dy = pi.y - pj.y
          if (dy > connectionDist || dy < -connectionDist) continue
          const distSq = dx * dx + dy * dy
          if (distSq < connectionDistSq) {
            ctx.beginPath()
            ctx.moveTo(pi.x, pi.y)
            ctx.lineTo(pj.x, pj.y)
            ctx.strokeStyle = `rgba(207,169,86,${0.035 * (1 - distSq / connectionDistSq)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }

    const tryStart = () => {
      if (!running && isVisible && isTabActive) {
        running = true
        raf = requestAnimationFrame(draw)
      }
    }

    const tryStop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isVisible = entry.isIntersecting
        }
        if (isVisible) tryStart()
        else tryStop()
      },
      { threshold: 0 },
    )
    observer.observe(c)

    const onVisibilityChange = () => {
      isTabActive = document.visibilityState === 'visible'
      if (isTabActive) tryStart()
      else tryStop()
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    tryStart()

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(resizeTimer)
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('resize', debouncedResize)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
}
