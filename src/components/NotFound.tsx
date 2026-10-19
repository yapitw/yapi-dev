import { Link } from '@tanstack/react-router'

export function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <h1 className="display text-3xl">Nothing drawn here</h1>
      <p className="mt-4 max-w-[60ch] text-ink-soft">
        This page doesn't exist. It may have moved when the site was rebuilt.
      </p>
      <p className="mt-6">
        <Link to="/lab" className="link">
          Browse the lab
        </Link>{' '}
        or go back to the{' '}
        <Link to="/" className="link">
          home page
        </Link>
        .
      </p>
    </div>
  )
}
