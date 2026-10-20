import { type RefObject, useEffect, useRef } from 'react'
import { createNoise3D } from 'simplex-noise'
import { blur } from '#/lib/blur'
import { readColorToken } from '#/lib/theme'

interface Particle {
  x: number
  y: number
  life: number
  /** Per-particle speed multiplier, so strokes don't march in lockstep along the same streamline. */
  speed: number
}

const NOISE_SCALE = 0.0012
const STEP = 1.6
/** Simplex noise's gradient averages ~2.2, so this keeps the mean speed near STEP. */
const NOISE_POTENTIAL = STEP / (2.2 * NOISE_SCALE)
/** Finite-difference step, in px, for taking the curl. */
const CURL_H = 1.5
const MAX_SPEED = STEP * 3
const SWIRL_STRENGTH = 2.4
/** Per-frame easing of the swirl's strength while the pointer is in, and after it leaves. */
const SWIRL_RISE = 0.02
const SWIRL_FALL = 0.015
/** Per-frame easing of the vortex centre toward the pointer. */
const SWIRL_FOLLOW = 0.06
/** Blur, in px, that turns the headline into a soft mass; bigger reaches further out. */
const TEXT_SPREAD = 32
/** How firmly the densest part of the headline holds the flow back; 1 is solid. */
const TEXT_FORCE = 0.8
/** Mass-map resolution: px per cell. */
const CELL = 4
const FADE_ALPHA = 0.016
const SWEEP_EVERY = 2

/**
 * The home page hero: pen strokes drifting through a simplex noise field.
 * The pointer stirs the field into a vortex, a nod to the latest lab experiment.
 * Text inside `avoid` is a soft mass in the stream, like a stone the flow eases around.
 */
export function FlowField({
  className = '',
  avoid,
}: {
  className?: string
  avoid?: RefObject<HTMLElement | null>
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const noise3D = createNoise3D()
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointer = { x: -9999, y: -9999, active: false }
    const swirl = { x: 0, y: 0, amount: 0 }
    let width = 0
    let height = 0
    let particles: Particle[] = []
    let time = 0
    let frame = 0
    let visible = true
    let disposed = false
    let tick = 0
    let swirlRadius = 0
    let pen = ''
    let paper = ''
    let lightPaper = true
    let field: Float32Array | null = null
    let fieldWidth = 0
    let fieldHeight = 0
    const textCenter = { x: 0, y: 0 }

    /** How much headline sits around (x, y), 0 to 1, bilinearly sampled. */
    const massAt = (x: number, y: number) => {
      if (!field) return 0
      const gx = Math.min(Math.max(x / CELL - 0.5, 0), fieldWidth - 1.001)
      const gy = Math.min(Math.max(y / CELL - 0.5, 0), fieldHeight - 1.001)
      const i = Math.floor(gx)
      const j = Math.floor(gy)
      const tx = gx - i
      const ty = gy - j
      const k = j * fieldWidth + i
      const top = field[k] + (field[k + 1] - field[k]) * tx
      const bottom =
        field[k + fieldWidth] + (field[k + fieldWidth + 1] - field[k + fieldWidth]) * tx
      return top + (bottom - top) * ty
    }

    /**
     * Stream function of the flow. Its curl is divergence-free, so strokes never pool into
     * hard lines. Blending it toward a constant where the headline's mass sits slows the flow
     * there and bends it around the word as a whole, rather than tracing every letter.
     * The constant is the field's value at the middle of the text, so only the difference
     * has to squeeze past.
     */
    const potential = (x: number, y: number, edge: number) => {
      const noise = noise3D(x * NOISE_SCALE, y * NOISE_SCALE, time) * NOISE_POTENTIAL
      let psi = noise + (edge - noise) * massAt(x, y) * TEXT_FORCE
      if (swirl.amount > 0.001) {
        // The swirl stays out of the blend: a vortex beside the text would otherwise force
        // its whole circulation through the clearance band.
        const r = Math.hypot(x - swirl.x, y - swirl.y)
        if (r < swirlRadius) {
          // Integral of an ease-out tangential speed: fastest at the centre, zero at the edge.
          const f = 1 - r / swirlRadius
          psi += swirl.amount * SWIRL_STRENGTH * swirlRadius * f * f * (1 - f / 3)
        }
      }
      return psi
    }

    const spawn = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      life: 200 + Math.random() * 400,
      speed: 0.45 + Math.random() * 1.1,
    })

    const readColors = () => {
      pen = readColorToken('--pen')
      paper = readColorToken('--paper')
      // The canvas normalises any opaque CSS colour to #rrggbb.
      ctx.fillStyle = paper
      const hex = ctx.fillStyle
      const luma =
        Number.parseInt(hex.slice(1, 3), 16) * 0.299 +
        Number.parseInt(hex.slice(3, 5), 16) * 0.587 +
        Number.parseInt(hex.slice(5, 7), 16) * 0.114
      lightPaper = luma > 127
    }

    /** Rasterise the text in `avoid` at its on-screen position and blur it into a mass map. */
    const buildField = () => {
      field = null
      const root = avoid?.current
      if (!root) return
      fieldWidth = Math.ceil(width / CELL)
      fieldHeight = Math.ceil(height / CELL)
      if (!fieldWidth || !fieldHeight) return
      const mask = document.createElement('canvas')
      mask.width = fieldWidth
      mask.height = fieldHeight
      const mctx = mask.getContext('2d', { willReadFrequently: true })
      if (!mctx) return
      mctx.scale(1 / CELL, 1 / CELL)
      mctx.textBaseline = 'alphabetic'
      const origin = canvas.getBoundingClientRect()
      const range = document.createRange()
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
      let left = Infinity
      let right = -Infinity
      let top = Infinity
      let bottom = -Infinity

      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        const text = node.textContent ?? ''
        const style = node.parentElement && getComputedStyle(node.parentElement)
        if (!style) continue
        mctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
        // Place each character where the browser laid it out, stretched to its box, so
        // line breaks, letter-spacing and the wide `wdth` axis all line up without replicating them.
        for (let i = 0; i < text.length; i++) {
          if (/\s/.test(text[i])) continue
          range.setStart(node, i)
          range.setEnd(node, i + 1)
          const box = range.getBoundingClientRect()
          if (!box.width) continue
          const metrics = mctx.measureText(text[i])
          if (!metrics.width) continue
          mctx.save()
          mctx.translate(
            box.left - origin.left,
            box.top - origin.top + metrics.fontBoundingBoxAscent,
          )
          mctx.scale(box.width / metrics.width, 1)
          mctx.fillText(text[i], 0, 0)
          mctx.restore()
          left = Math.min(left, box.left)
          right = Math.max(right, box.right)
          top = Math.min(top, box.top)
          bottom = Math.max(bottom, box.bottom)
        }
      }
      if (left > right) return
      textCenter.x = (left + right) / 2 - origin.left
      textCenter.y = (top + bottom) / 2 - origin.top

      const pixels = mctx.getImageData(0, 0, fieldWidth, fieldHeight).data
      const mass = new Float32Array(fieldWidth * fieldHeight)
      for (let i = 0; i < mass.length; i++) mass[i] = pixels[i * 4 + 3] / 255
      blur(mass, fieldWidth, fieldHeight, TEXT_SPREAD / CELL)
      // Normalise so the densest part of the word is 1, whatever the font size.
      let peak = 0
      for (const value of mass) peak = Math.max(peak, value)
      if (peak > 0) for (let i = 0; i < mass.length; i++) mass[i] /= peak
      field = mass
    }

    // A low-alpha fade stalls once a pixel is within ~1 / (2 * FADE_ALPHA) levels of the paper,
    // because the per-frame change rounds to zero in 8-bit channels. That left a permanent
    // tint wherever the swirl piled strokes up. Nudge every channel one level toward the
    // paper, then clamp to the paper so nothing overshoots.
    const sweepResidue = () => {
      ctx.globalCompositeOperation = lightPaper ? 'lighter' : 'difference'
      ctx.fillStyle = 'rgb(1 1 1)'
      ctx.fillRect(0, 0, width, height)
      ctx.globalCompositeOperation = lightPaper ? 'darken' : 'lighten'
      ctx.fillStyle = paper
      ctx.fillRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'source-over'
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      swirlRadius = Math.max(220, Math.min(width, height) * 0.5)
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      ctx.fillStyle = paper
      ctx.fillRect(0, 0, width, height)
      buildField()
      const count = Math.min(3600, Math.round((width * height) / 360))
      particles = Array.from({ length: count }, spawn)
    }

    const step = (fade: boolean) => {
      if (fade) {
        ctx.globalAlpha = FADE_ALPHA
        ctx.fillStyle = paper
        ctx.fillRect(0, 0, width, height)
        ctx.globalAlpha = 1
        tick += 1
        if (tick % SWEEP_EVERY === 0) sweepResidue()
      }
      ctx.globalAlpha = reducedMotion ? 0.14 : 0.22
      ctx.strokeStyle = pen
      ctx.lineWidth = 0.9
      ctx.beginPath()
      // The pointer's pull builds up while it stays and dies away after it leaves, and the
      // vortex trails the pointer, so strokes bend gradually instead of snapping to it.
      if (swirl.amount < 0.01) {
        swirl.x = pointer.x
        swirl.y = pointer.y
      } else {
        swirl.x += (pointer.x - swirl.x) * SWIRL_FOLLOW
        swirl.y += (pointer.y - swirl.y) * SWIRL_FOLLOW
      }
      swirl.amount += pointer.active ? (1 - swirl.amount) * SWIRL_RISE : -swirl.amount * SWIRL_FALL
      const edge = field
        ? noise3D(textCenter.x * NOISE_SCALE, textCenter.y * NOISE_SCALE, time) * NOISE_POTENTIAL
        : 0
      for (const p of particles) {
        let vx =
          (potential(p.x, p.y + CURL_H, edge) - potential(p.x, p.y - CURL_H, edge)) / (2 * CURL_H)
        let vy =
          -(potential(p.x + CURL_H, p.y, edge) - potential(p.x - CURL_H, p.y, edge)) / (2 * CURL_H)
        // Backstop for the tight gaps between letters: slow down, keep the direction.
        const speed = Math.hypot(vx, vy)
        if (speed > MAX_SPEED) {
          vx *= MAX_SPEED / speed
          vy *= MAX_SPEED / speed
        }

        ctx.moveTo(p.x, p.y)
        p.x += vx * p.speed
        p.y += vy * p.speed
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
    if (avoid?.current) resizeObserver.observe(avoid.current)

    // Glyph shapes change once the web font arrives.
    document.fonts.ready.then(() => {
      if (!disposed) restart()
    })

    const scheme = window.matchMedia('(prefers-color-scheme: dark)')
    scheme.addEventListener('change', restart)
    window.addEventListener('themechange', restart)
    document.addEventListener('visibilitychange', onVisibility)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerleave', onPointerLeave)

    restart()

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      observer.disconnect()
      resizeObserver.disconnect()
      scheme.removeEventListener('change', restart)
      window.removeEventListener('themechange', restart)
      document.removeEventListener('visibilitychange', onVisibility)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [avoid])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`block h-full w-full touch-pan-y ${className}`}
    />
  )
}
