import { createFileRoute } from '@tanstack/react-router'
import { webWorks } from '#/content/works'
import { seo } from '#/lib/seo'

export const Route = createFileRoute('/work')({
  head: () => ({
    meta: seo({
      title: 'Web work',
      description: 'Websites and web applications Ho Chun-Hsi built for clients and employers.',
    }),
  }),
  component: Work,
})

function Work() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
      <h1 className="display text-[clamp(2.75rem,8vw,4.5rem)]">Web work</h1>
      <p className="mt-5 max-w-[60ch] text-lg text-ink-soft">
        Sites and applications I built for clients and employers, from campaign pages to a BIM
        viewer.
      </p>

      <div className="mt-14 flex flex-col gap-20">
        {webWorks.map((work) => (
          <article
            key={work.title}
            className="grid gap-6 border-t border-rule pt-8 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:gap-10"
          >
            <a href={work.url} className="block overflow-hidden bg-paper-sunk" tabIndex={-1}>
              <img
                src={work.image}
                alt={`Screenshot of ${work.title}`}
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full object-cover object-top"
              />
            </a>
            <div>
              <h2 className="heading text-2xl">
                <a href={work.url} className="hover:text-pen">
                  {work.title}
                </a>
              </h2>
              <p className="mt-2 flex flex-wrap gap-x-5 text-sm">
                <a className="link break-all" href={work.url}>
                  {new URL(work.url).hostname}
                </a>
                {work.sourceUrl && (
                  <a className="link" href={work.sourceUrl}>
                    Source code
                  </a>
                )}
              </p>
              <h3 className="mt-6 text-sm text-ink-soft">What I did</h3>
              <ul className="mt-2 flex flex-col gap-1.5">
                {work.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
