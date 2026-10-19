import { createFileRoute } from '@tanstack/react-router'
import { NotFound } from '#/components/NotFound'
import { seo } from '#/lib/seo'

// Prerendered to /404.html, which the static host serves for unknown URLs.
export const Route = createFileRoute('/404')({
  head: () => ({
    meta: [...seo({ title: 'Page not found' }), { name: 'robots', content: 'noindex' }],
  }),
  component: NotFound,
})
