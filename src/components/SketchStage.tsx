import { useEffect, useRef, useState } from 'react'
import type { SketchConstructor, SketchInstance } from '#/content/experiments'

type Status = 'loading' | 'running' | 'failed'

/**
 * Mounts a lab sketch into a square stage. Sketches touch `window` on import,
 * so they load only in the browser, after hydration.
 */
export function SketchStage({
  load,
  title,
  className = '',
}: {
  load: () => Promise<SketchConstructor>
  title: string
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    let instance: SketchInstance | undefined
    let cancelled = false
    setStatus('loading')

    load()
      .then((Sketch) => {
        if (cancelled) return
        instance = new Sketch(container)
        setStatus('running')
      })
      .catch((error: unknown) => {
        console.error(error)
        if (!cancelled) setStatus('failed')
      })

    return () => {
      cancelled = true
      if (instance) {
        instance.terminated = true
        instance.destroy?.()
      }
      container.replaceChildren()
    }
  }, [load])

  return (
    <figure
      className={`relative aspect-square w-full overflow-hidden bg-paper-sunk ${className}`}
      aria-label={`${title}, live sketch`}
    >
      <div ref={containerRef} className="sketch-stage absolute inset-0" />
      {status !== 'running' && (
        <figcaption className="absolute inset-0 grid place-items-center text-sm text-ink-soft">
          {status === 'loading'
            ? 'Loading sketch…'
            : 'This sketch failed to load. Reload the page to try again.'}
        </figcaption>
      )}
    </figure>
  )
}
