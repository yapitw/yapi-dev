import { profile } from '#/content/resume'

export function SiteFooter() {
  return (
    <footer className="no-print mt-24 border-t border-rule">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <ul className="flex flex-wrap gap-x-6 gap-y-1">
          {profile.contacts.map((contact) => (
            <li key={contact.label}>
              <a className="hover:text-ink" href={contact.href}>
                {contact.label}
              </a>
            </li>
          ))}
        </ul>
        <p>
          Every sketch on this site is open source on{' '}
          <a className="hover:text-ink underline" href="https://github.com/yapitw/yapi-graphics">
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
