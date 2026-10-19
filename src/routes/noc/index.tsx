import { createFileRoute, Link } from '@tanstack/react-router'
import { nocExercises } from '#/content/noc'
import { seo } from '#/lib/seo'

export const Route = createFileRoute('/noc/')({
  head: () => ({
    meta: seo({
      title: 'The Nature of Code exercises',
      description: 'p5.js studies of noise, vectors and forces.',
    }),
  }),
  component: NocIndex,
})

function NocIndex() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
      <p className="text-sm text-ink-soft">
        <Link to="/lab" className="hover:text-ink">
          Lab
        </Link>{' '}
        / The Nature of Code
      </p>
      <h1 className="display mt-3 text-[clamp(2.25rem,6vw,3rem)]">The Nature of Code exercises</h1>
      <p className="mt-5 max-w-[60ch] text-lg text-ink-soft">
        Studies written while following{' '}
        <a
          className="link"
          href="https://www.youtube.com/playlist?list=PLRqwX-V7Uu6ZV4yEcW3uDwOgGXKUUsPOM"
        >
          The Nature of Code 2
        </a>{' '}
        by Daniel Shiffman, numbered by episode.
      </p>
      <ol className="mt-12 max-w-3xl border-t border-rule">
        {nocExercises.map((exercise) => (
          <li key={exercise.id} className="border-b border-rule">
            <Link
              to="/noc/$id"
              params={{ id: exercise.id }}
              className="group grid grid-cols-[3.5rem_1fr] items-baseline py-4"
            >
              <span className="text-sm tabular-nums text-ink-soft">{exercise.episode}</span>
              <span className="text-lg group-hover:text-pen">{exercise.title}</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}
