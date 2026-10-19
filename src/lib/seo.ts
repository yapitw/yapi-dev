export const SITE_NAME = 'Ho Chun-Hsi'
export const SITE_URL = 'https://yapi.dev'

/** Builds the meta tags for a page. Titles read "Page — Ho Chun-Hsi". */
export function seo({ title, description }: { title?: string; description?: string }) {
  const fullTitle = title
    ? `${title} — ${SITE_NAME}`
    : `${SITE_NAME} — creative front-end developer`
  return [
    { title: fullTitle },
    { property: 'og:title', content: fullTitle },
    { name: 'twitter:title', content: fullTitle },
    ...(description
      ? [
          { name: 'description', content: description },
          { property: 'og:description', content: description },
          { name: 'twitter:description', content: description },
        ]
      : []),
  ]
}
