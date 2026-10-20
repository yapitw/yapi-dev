import { createFileRoute, Link } from '@tanstack/react-router'
import { useRef } from 'react'
import { ExperimentCard } from '#/components/ExperimentCard'
import { FlowField } from '#/components/FlowField'
import { experiments } from '#/content/experiments'
import { career, profile } from '#/content/resume'
import { webWorks } from '#/content/works'

export const Route = createFileRoute('/')({
  component: Home,
})

const featured = experiments.slice(0, 6)

function Home() {
  const current = career[0]
  const headline = useRef<HTMLHeadingElement>(null)

  return (
    <>
      <section className="relative h-[min(86svh,820px)] min-h-[520px] overflow-hidden border-b border-rule">
        <FlowField className="absolute inset-0" avoid={headline} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 sm:pb-14">
            <h1 ref={headline} className="display text-[clamp(3.25rem,12vw,9.5rem)]">
              Ho
              <br />
              Chun-Hsi
            </h1>
            <p className="mt-6 max-w-[34ch] text-lg leading-snug sm:text-xl">
              Front-end developer with an industrial design background. I write code that draws.
            </p>
          </div>
        </div>
        <p className="pointer-events-none absolute top-5 right-4 hidden text-sm text-ink-soft sm:right-6 md:block">
          Move through the field to stir it.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6" aria-labelledby="lab-heading">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 id="lab-heading" className="heading text-2xl">
            From the lab
          </h2>
          <Link to="/lab" className="link text-base">
            All {experiments.length} experiments
          </Link>
        </div>
        <p className="mt-3 max-w-[60ch] text-ink-soft">
          Generative sketches and shaders in p5.js, three.js and GLSL. Each one runs live in the
          browser.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((experiment, index) => (
            <ExperimentCard key={experiment.slug} experiment={experiment} eager={index < 3} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6" aria-labelledby="work-heading">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 id="work-heading" className="heading text-2xl">
            Web work
          </h2>
          <Link to="/work" className="link text-base">
            See the projects
          </Link>
        </div>
        <ul className="mt-8 border-t border-rule">
          {webWorks.map((work) => (
            <li key={work.title} className="border-b border-rule">
              <a
                href={work.url}
                className="group grid gap-1 py-5 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6"
              >
                <span className="heading text-xl group-hover:text-pen">{work.title}</span>
                <span className="text-sm text-ink-soft">{new URL(work.url).hostname}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="mx-auto grid max-w-6xl gap-8 px-4 pt-24 sm:px-6 md:grid-cols-[1fr_1.4fr]"
        aria-labelledby="about-heading"
      >
        <h2 id="about-heading" className="heading text-2xl">
          About
        </h2>
        <div className="max-w-[60ch]">
          <p className="text-lg">
            {profile.summary.en} Currently a {current.role.en.toLowerCase()} at {current.company}.
            Before code, I designed and 3D-printed accessories, and I still paint and sculpt for
            fun.
          </p>
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/about/{-$lang}" params={{ lang: undefined }} className="link">
              Read the résumé
            </Link>
            <a href="mailto:yapi.tw@gmail.com" className="link">
              yapi.tw@gmail.com
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
