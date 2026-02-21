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
    const isMobile = window.innerWidth < 768
    const particleCount = isMobile ? 18 : 35
    const connectionDist = isMobile ? 90 : 110

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      c.width = c.offsetWidth * dpr
      c.height = c.offsetHeight * dpr
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    const w = () => c.offsetWidth
    const h = () => c.offsetHeight

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * w(),
      y: Math.random() * h(),
      r: Math.random() * 1.4 + 0.3,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.18,
      a: Math.random() * 0.25 + 0.05,
    }))

    const draw = () => {
      const lw = w()
      const lh = h()
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
        for (let j = i + 1; j < particles.length; j++) {
          const pi = particles[i]!
          const pj = particles[j]!
          const dx = pi.x - pj.x
          const dy = pi.y - pj.y
          const distSq = dx * dx + dy * dy
          if (distSq < connectionDist * connectionDist) {
            const dist = Math.sqrt(distSq)
            ctx.beginPath()
            ctx.moveTo(pi.x, pi.y)
            ctx.lineTo(pj.x, pj.y)
            ctx.strokeStyle = `rgba(207,169,86,${0.035 * (1 - dist / connectionDist)})`
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
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
}
