import { useEffect, useRef } from 'react'
import { createNoise3D } from 'simplex-noise'
import { readColorToken } from '#/lib/theme'

interface Particle {
  x: number
  y: number
  life: number
}

const NOISE_SCALE = 0.0022
const STEP = 1.6
const SWIRL_RADIUS = 180

/**
 * The home page hero: pen strokes drifting through a simplex noise field.
 * The pointer stirs the field into a vortex, a nod to the latest lab experiment.
 */
export function FlowField({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const noise3D = createNoise3D()
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointer = { x: -9999, y: -9999, active: false }
    let width = 0
    let height = 0
    let particles: Particle[] = []
    let time = 0
    let frame = 0
    let visible = true
    let pen = ''
    let paper = ''

    const spawn = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      life: 200 + Math.random() * 400,
    })

    const readColors = () => {
      pen = readColorToken('--pen')
      paper = readColorToken('--paper')
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      ctx.fillStyle = paper
      ctx.fillRect(0, 0, width, height)
      const count = Math.min(1800, Math.round((width * height) / 700))
      particles = Array.from({ length: count }, spawn)
    }

    const step = (fade: boolean) => {
      if (fade) {
        ctx.globalAlpha = 0.016
        ctx.fillStyle = paper
        ctx.fillRect(0, 0, width, height)
      }
      ctx.globalAlpha = reducedMotion ? 0.14 : 0.22
      ctx.strokeStyle = pen
      ctx.lineWidth = 0.9
      ctx.beginPath()
      for (const p of particles) {
        const angle = noise3D(p.x * NOISE_SCALE, p.y * NOISE_SCALE, time) * Math.PI * 2
        let vx = Math.cos(angle) * STEP
        let vy = Math.sin(angle) * STEP

        if (pointer.active) {
          const dx = p.x - pointer.x
          const dy = p.y - pointer.y
          const distance = Math.hypot(dx, dy)
          if (distance < SWIRL_RADIUS && distance > 1) {
            // Tangential pull: particles orbit the pointer and drift inward.
            const strength = (1 - distance / SWIRL_RADIUS) * 3.2
            vx += (-dy / distance) * strength - (dx / distance) * strength * 0.25
            vy += (dx / distance) * strength - (dy / distance) * strength * 0.25
          }
        }

        ctx.moveTo(p.x, p.y)
        p.x += vx
        p.y += vy
        ctx.lineTo(p.x, p.y)
        p.life -= 1
        if (p.life <= 0 || p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
          Object.assign(p, spawn())
        }
      }
      ctx.stroke()
      ctx.globalAlpha = 1
      time += 0.0012
    }

    const loop = () => {
      step(true)
      frame = requestAnimationFrame(loop)
    }

    const start = () => {
      cancelAnimationFrame(frame)
      if (reducedMotion) {
        // Draw a still set of streamlines instead of animating.
        for (let i = 0; i < 160; i++) step(false)
      } else if (visible && !document.hidden) {
        frame = requestAnimationFrame(loop)
      }
    }

    const restart = () => {
      readColors()
      resize()
      start()
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pointer.active = true
    }
    const onPointerLeave = () => {
      pointer.active = false
    }
    const onVisibility = () => start()

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (!visible) cancelAnimationFrame(frame)
      else start()
    })
    observer.observe(canvas)

    const resizeObserver = new ResizeObserver(() => restart())
    resizeObserver.observe(canvas)

    const scheme = window.matchMedia('(prefers-color-scheme: dark)')
    scheme.addEventListener('change', restart)
    window.addEventListener('themechange', restart)
    document.addEventListener('visibilitychange', onVisibility)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerleave', onPointerLeave)

    restart()

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      resizeObserver.disconnect()
      scheme.removeEventListener('change', restart)
      window.removeEventListener('themechange', restart)
      document.removeEventListener('visibilitychange', onVisibility)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`block h-full w-full touch-pan-y ${className}`}
    />
  )
}
