import { Link } from '@tanstack/react-router'
import type { Experiment } from '#/content/experiments'

export function ExperimentCard({
  experiment,
  eager = false,
}: {
  experiment: Experiment
  eager?: boolean
}) {
  return (
    <Link to="/lab/$slug" params={{ slug: experiment.slug }} className="group block">
      <div className="aspect-square overflow-hidden bg-paper-sunk">
        <img
          src={experiment.thumbnail}
          alt=""
          width={800}
          height={800}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="h-full w-full object-cover transition-[filter] duration-300 group-hover:brightness-110"
        />
      </div>
      <div className="mt-3 flex items-baseline gap-3">
        <span className="text-sm tabular-nums text-ink-soft">{experiment.number}</span>
        <h3 className="heading text-lg group-hover:text-pen">{experiment.title}</h3>
      </div>
      <p className="mt-0.5 pl-[calc(2ch+0.75rem)] text-sm text-ink-soft">
        {experiment.tools.join(', ')}
      </p>
    </Link>
  )
}
