import { createFileRoute, Link } from '@tanstack/react-router'
import { ExperimentCard } from '#/components/ExperimentCard'
import { experiments } from '#/content/experiments'
import { nocExercises } from '#/content/noc'
import { seo } from '#/lib/seo'

export const Route = createFileRoute('/lab/')({
  head: () => ({
    meta: seo({
      title: 'Lab',
      description: 'Generative sketches and shaders in p5.js, three.js and GLSL, running live.',
    }),
  }),
  component: Lab,
})

function Lab() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
      <h1 className="display text-[clamp(2.75rem,8vw,4.5rem)]">Lab</h1>
      <p className="mt-5 max-w-[60ch] text-lg text-ink-soft">
        Generative sketches and shaders, numbered in the order I made them. Open one to run it in
        your browser.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {experiments.map((experiment, index) => (
          <ExperimentCard key={experiment.slug} experiment={experiment} eager={index < 3} />
        ))}
      </div>

      <section className="mt-24 grid gap-6 border-t border-rule pt-10 md:grid-cols-[1fr_1.4fr]">
        <h2 className="heading text-xl">The Nature of Code exercises</h2>
        <div className="max-w-[60ch]">
          <p className="text-ink-soft">
            {nocExercises.length} small p5.js studies of noise, vectors and forces, written while
            following Daniel Shiffman's The Nature of Code video series.
          </p>
          <p className="mt-4">
            <Link to="/noc" className="link">
              Open the exercises
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
