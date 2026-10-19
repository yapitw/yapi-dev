import { createFileRoute } from '@tanstack/react-router'
import { useRef, useState } from 'react'
import { type Artwork, artSeries } from '#/content/art'
import { seo } from '#/lib/seo'

export const Route = createFileRoute('/art')({
  head: () => ({
    meta: seo({
      title: 'Digital art',
      description: '2D paintings and 3D sculptures Ho Chun-Hsi makes as a hobby.',
    }),
  }),
  component: Art,
})

function Art() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState<{ work: Artwork; label: string } | null>(null)

  const show = (work: Artwork, label: string) => {
    setOpen({ work, label })
    dialogRef.current?.showModal()
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
      <h1 className="display text-[clamp(2.75rem,8vw,4.5rem)]">Digital art</h1>
      <p className="mt-5 max-w-[60ch] text-lg text-ink-soft">
        Paintings and sculptures I make for fun, away from code.
      </p>

      {artSeries.map((series) => (
        <section key={series.id} className="mt-16" aria-labelledby={`${series.id}-heading`}>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-rule pt-6">
            <h2 id={`${series.id}-heading`} className="heading text-2xl">
              {series.title}
            </h2>
            <p className="text-ink-soft">{series.medium}</p>
          </div>
          <ul className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3">
            {series.works.map((work, index) => {
              const label = `${series.title}, piece ${index + 1} of ${series.works.length}`
              return (
                <li key={work.src} className="mb-5 break-inside-avoid">
                  <button
                    type="button"
                    onClick={() => show(work, label)}
                    className="block w-full cursor-zoom-in bg-paper-sunk"
                    aria-label={`Enlarge ${label}`}
                  >
                    <img
                      src={work.src}
                      alt=""
                      width={work.width}
                      height={work.height}
                      loading="lazy"
                      decoding="async"
                      className="h-auto w-full"
                    />
                  </button>
                </li>
              )
            })}
          </ul>
        </section>
      ))}

      {/* biome-ignore lint/a11y/useKeyWithClickEvents: backdrop click is a mouse shortcut; keyboard users close with Escape or the Close button. */}
      <dialog
        ref={dialogRef}
        onClose={() => setOpen(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close()
        }}
        aria-label={open?.label}
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-paper/95"
      >
        {open && (
          <figure className="flex h-dvh w-dvw flex-col items-center justify-center gap-3 p-4 sm:p-10">
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: same mouse shortcut as the backdrop. */}
            <img
              src={open.work.src}
              alt={open.label}
              className="min-h-0 max-w-full flex-1 object-contain"
              onClick={() => dialogRef.current?.close()}
            />
            <figcaption className="flex items-center gap-6 text-sm text-ink-soft">
              {open.label}
              <button type="button" className="link" onClick={() => dialogRef.current?.close()}>
                Close
              </button>
            </figcaption>
          </figure>
        )}
      </dialog>
    </div>
  )
}
