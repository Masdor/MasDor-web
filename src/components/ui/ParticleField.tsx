import { useRef, useEffect } from 'react'
import styles from './ParticleField.module.css'

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return

    let raf: number
    let resizeTimer: ReturnType<typeof setTimeout>
    const isMobile = window.innerWidth < 768
    const particleCount = isMobile ? 18 : 35
    const connectionDist = isMobile ? 90 : 110
    const connectionDistSq = connectionDist * connectionDist

    let prevW = c.offsetWidth
    let prevH = c.offsetHeight

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
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

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * prevW,
      y: Math.random() * prevH,
      r: Math.random() * 1.4 + 0.3,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.18,
      a: Math.random() * 0.25 + 0.05,
    }))

    const draw = () => {
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
    draw()

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', debouncedResize)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
}
