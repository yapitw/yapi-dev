import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { career, coreSkills, education, type Lang, labels, profile, t } from '#/content/resume'
import { SITE_URL, seo } from '#/lib/seo'

export const Route = createFileRoute('/about/{-$lang}')({
  beforeLoad: ({ params }) => {
    if (params.lang !== undefined && params.lang !== 'zh') throw notFound()
  },
  head: ({ params }) => ({
    meta: seo({
      title: params.lang === 'zh' ? '關於' : 'About',
      description: t(profile.summary, params.lang === 'zh' ? 'zh' : 'en'),
    }),
  }),
  component: About,
})

function About() {
  const { lang: param } = Route.useParams()
  const lang: Lang = param === 'zh' ? 'zh' : 'en'
  const pagePath = lang === 'zh' ? '/about/zh' : '/about'

  return (
    <div
      lang={lang === 'zh' ? 'zh-Hant' : 'en'}
      className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 print:pt-0"
    >
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="display text-[clamp(2.75rem,8vw,4.5rem)] print:text-3xl">
            {profile.name}
            <span className="sr-only"> {profile.nameZh}</span>
          </h1>
          <p className="mt-3 text-ink-soft">
            {profile.nameZh}, {profile.alias}
          </p>
        </div>
        <p className="hidden text-sm text-ink-soft print:block">
          {t(labels.printedFrom, lang)}{' '}
          <a href={`${SITE_URL}${pagePath}`}>{`${SITE_URL.replace('https://', '')}${pagePath}`}</a>
        </p>
        <div className="no-print flex items-center gap-5 text-sm">
          <nav aria-label="Language" className="flex gap-3">
            <Link
              to="/about/{-$lang}"
              params={{ lang: undefined }}
              activeOptions={{ exact: true }}
              className="text-ink-soft hover:text-ink"
              activeProps={{ className: 'text-ink! underline decoration-pen decoration-2' }}
              hrefLang="en"
            >
              English
            </Link>
            <Link
              to="/about/{-$lang}"
              params={{ lang: 'zh' }}
              className="text-ink-soft hover:text-ink"
              activeProps={{ className: 'text-ink! underline decoration-pen decoration-2' }}
              hrefLang="zh-Hant"
            >
              中文
            </Link>
          </nav>
          <button type="button" className="link" onClick={() => window.print()}>
            {t(labels.print, lang)}
          </button>
        </div>
      </header>

      <p className="mt-10 max-w-[38ch] text-xl leading-snug sm:text-2xl print:mt-4 print:max-w-none print:text-xl">
        {t(profile.summary, lang)}
      </p>

      <div className="mt-16 grid gap-x-12 gap-y-14 lg:grid-cols-[18rem_minmax(0,1fr)] print:mt-8 print:grid-cols-[15rem_minmax(0,1fr)] print:gap-x-10">
        <aside className="flex flex-col gap-10">
          <Section title={t(labels.contact, lang)}>
            <ul className="flex flex-col gap-1">
              {profile.contacts.map((contact) => (
                <li key={contact.label}>
                  <span className="text-ink-soft">{contact.label}: </span>
                  <a className="link break-all print:break-normal" href={contact.href}>
                    {contact.value}
                  </a>
                </li>
              ))}
            </ul>
          </Section>

          <Section title={t(labels.languages, lang)}>
            <ul className="flex flex-col gap-1">
              {profile.languages.map((item) => (
                <li key={item.en}>{t(item, lang)}</li>
              ))}
            </ul>
          </Section>

          <Section title={t(labels.coreSkills, lang)}>
            {coreSkills.map((group) => (
              <div key={group.title.en} className="mt-4 first:mt-0">
                <h3 className="font-semibold">{t(group.title, lang)}</h3>
                <ul className="mt-1.5 flex flex-col gap-1 text-base text-ink-soft">
                  {group.items.map((item) => (
                    <li key={item.en}>{t(item, lang)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Section>

          <Section title={t(labels.education, lang)}>
            <ul className="flex flex-col gap-4">
              {education.map((item) => (
                <li key={item.title.en}>
                  <h3 className="font-semibold">{t(item.title, lang)}</h3>
                  <p className="text-base text-ink-soft">{t(item.detail, lang)}</p>
                </li>
              ))}
            </ul>
          </Section>
        </aside>

        <Section title={t(labels.career, lang)}>
          <ol className="flex flex-col">
            {career.map((role) => (
              <li
                key={role.company}
                className="grid gap-x-8 gap-y-2 border-t border-rule py-7 first:border-t-0 first:pt-0 sm:grid-cols-[10rem_minmax(0,1fr)] print:grid-cols-[9rem_minmax(0,1fr)] print:gap-x-6 print:py-3.5"
              >
                <p className="text-sm text-ink-soft tabular-nums sm:pt-1.5">
                  {t(role.period, lang)}
                </p>
                <div>
                  <h3 className="heading text-xl">{role.company}</h3>
                  <p className="text-ink-soft">{t(role.role, lang)}</p>
                  {role.stack && (
                    <p className="mt-3 text-sm">
                      <span className="text-ink-soft">{t(labels.stack, lang)}: </span>
                      {role.stack.join(', ')}
                    </p>
                  )}
                  {role.duties && (
                    <ul className="mt-3 flex list-disc flex-col gap-1 pl-5 print:gap-0.5 text-base marker:text-rule">
                      {role.duties.map((duty) => (
                        <li key={duty.en}>{t(duty, lang)}</li>
                      ))}
                    </ul>
                  )}
                  {role.projects?.map((project) => (
                    <div key={project.name} className="mt-5 print:mt-3">
                      <h4 className="font-semibold">{project.name}</h4>
                      <p className="mt-1 text-base text-ink-soft">{project.description}</p>
                      {project.duties.length > 0 && (
                        <ul className="mt-2 flex list-disc flex-col gap-1 pl-5 print:gap-0.5 text-base marker:text-rule">
                          {project.duties.map((duty) => (
                            <li key={duty}>{duty}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </Section>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="heading mb-4 text-lg">{title}</h2>
      {children}
    </section>
  )
}
