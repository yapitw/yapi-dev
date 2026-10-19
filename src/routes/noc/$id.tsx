import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { useCallback } from 'react'
import { SketchStage } from '#/components/SketchStage'
import type { SketchConstructor } from '#/content/experiments'
import { findNocExercise } from '#/content/noc'
import { seo } from '#/lib/seo'

export const Route = createFileRoute('/noc/$id')({
  loader: ({ params }) => {
    const found = findNocExercise(params.id)
    if (!found) throw notFound()
    return found
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? seo({ title: `${loaderData.exercise.episode} ${loaderData.exercise.title}` })
      : [],
  }),
  component: NocExercisePage,
})

function NocExercisePage() {
  const { exercise, previous, next } = Route.useLoaderData()

  // Wrap the p5 sketch function in the same constructor shape the lab sketches use.
  const load = useCallback(
    (): Promise<SketchConstructor> =>
      Promise.all([import('p5'), import('#/sketches/noc')]).then(
        ([{ default: P5 }, { default: sketches }]) =>
          class {
            instance: InstanceType<typeof P5>
            constructor(container: HTMLDivElement) {
              this.instance = new P5(sketches[exercise.id], container)
            }
            destroy() {
              this.instance.remove()
            }
          },
      ),
    [exercise.id],
  )

  return (
    <article className="mx-auto grid max-w-6xl gap-10 px-4 pt-10 sm:px-6 lg:grid-cols-[minmax(0,32rem)_1fr] lg:gap-12 lg:pt-14">
      <SketchStage key={exercise.id} load={load} title={exercise.title} />
      <div className="flex flex-col">
        <p className="text-sm text-ink-soft">
          <Link to="/noc" className="hover:text-ink">
            The Nature of Code
          </Link>{' '}
          / Episode {exercise.episode}
        </p>
        <h1 className="display mt-3 text-[clamp(2rem,4vw,2.75rem)]">{exercise.title}</h1>
        <p className="mt-5 text-sm">
          <a
            className="link"
            href={`https://github.com/yapitw/yapi-graphics/tree/master/src/sketches/noc/lecture${exercise.id.split('_')[0].replace('lecture', '')}.ts`}
          >
            Source on GitHub
          </a>
        </p>
        <nav
          aria-label="Other exercises"
          className="mt-10 grid grid-cols-2 gap-4 border-t border-rule pt-5 text-sm lg:mt-auto"
        >
          {previous ? (
            <Link to="/noc/$id" params={{ id: previous.id }} className="group">
              <span className="block text-ink-soft">Previous</span>
              <span className="group-hover:text-pen">{previous.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link to="/noc/$id" params={{ id: next.id }} className="group text-right">
              <span className="block text-ink-soft">Next</span>
              <span className="group-hover:text-pen">{next.title}</span>
            </Link>
          )}
        </nav>
      </div>
    </article>
  )
}
