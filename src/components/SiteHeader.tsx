import { Link } from '@tanstack/react-router'
import { ThemeToggle } from './ThemeToggle'

const nav = [
  { to: '/lab', label: 'Lab' },
  { to: '/work', label: 'Work' },
  { to: '/art', label: 'Art' },
  { to: '/about/{-$lang}', label: 'About' },
] as const

export function SiteHeader() {
  return (
    <header className="no-print sticky top-0 z-20 border-b border-rule bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="heading text-base whitespace-nowrap">
          Ho Chun-Hsi
        </Link>
        <nav aria-label="Main" className="flex items-center gap-4 sm:gap-7">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm text-ink-soft hover:text-ink"
              activeProps={{
                className:
                  'text-ink! underline decoration-pen decoration-2 underline-offset-[0.45em]',
              }}
            >
              {item.label}
            </Link>
          ))}
          <span aria-hidden className="hidden h-4 w-px bg-rule sm:block" />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
