import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { SketchStage } from '#/components/SketchStage'
import { findExperiment } from '#/content/experiments'
import { seo } from '#/lib/seo'

const REPO_URL = 'https://github.com/yapitw/yapi-graphics/tree/master'

export const Route = createFileRoute('/lab/$slug')({
  // Entries hold their sketch loader, which can't be serialized, so the loader only validates.
  loader: ({ params }) => {
    if (!findExperiment(params.slug)) throw notFound()
  },
  head: ({ params }) => {
    const found = findExperiment(params.slug)
    return {
      meta: found
        ? seo({ title: found.experiment.title, description: found.experiment.description })
        : [],
    }
  },
  component: ExperimentPage,
})

function ExperimentPage() {
  const { slug } = Route.useParams()
  const found = findExperiment(slug)
  if (!found) return null
  const { experiment, newer, older } = found

  return (
    <article className="mx-auto grid max-w-6xl gap-10 px-4 pt-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12 lg:pt-14">
      <SketchStage
        key={experiment.slug}
        load={experiment.load}
        title={experiment.title}
        className="lg:max-h-[calc(100svh-8rem)] lg:max-w-[calc(100svh-8rem)]"
      />

      <div className="flex flex-col lg:pt-1">
        <p className="text-sm text-ink-soft">
          <Link to="/lab" className="hover:text-ink">
            Lab
          </Link>{' '}
          / Experiment {experiment.number}
        </p>
        <h1 className="display mt-3 text-[clamp(2.25rem,5vw,3rem)]">{experiment.title}</h1>
        <p className="mt-5 max-w-[60ch]">{experiment.description}</p>

        <dl className="mt-8 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-rule pt-5 text-sm">
          <dt className="text-ink-soft">Made with</dt>
          <dd>{experiment.tools.join(', ')}</dd>
          <dt className="text-ink-soft">Source</dt>
          <dd>
            <a className="link" href={`${REPO_URL}/${experiment.sourcePath}`}>
              GitHub
            </a>
          </dd>
          {experiment.externalUrl && (
            <>
              <dt className="text-ink-soft">Hosted at</dt>
              <dd>
                <a className="link break-all" href={experiment.externalUrl}>
                  {new URL(experiment.externalUrl).hostname}
                </a>
              </dd>
            </>
          )}
        </dl>

        <nav
          aria-label="Other experiments"
          className="mt-10 grid grid-cols-2 gap-4 border-t border-rule pt-5 text-sm lg:mt-auto"
        >
          {older ? (
            <Link to="/lab/$slug" params={{ slug: older.slug }} className="group">
              <span className="block text-ink-soft">Previous</span>
              <span className="heading text-base group-hover:text-pen">{older.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link to="/lab/$slug" params={{ slug: newer.slug }} className="group text-right">
              <span className="block text-ink-soft">Next</span>
              <span className="heading text-base group-hover:text-pen">{newer.title}</span>
            </Link>
          )}
        </nav>
      </div>
    </article>
  )
}
