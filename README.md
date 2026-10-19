# yapi-graphics

Source of [yapi.dev](https://yapi.dev): generative sketches, web work, digital art and résumé of Ho Chun-Hsi.

Built with TanStack Start (React 19), Tailwind CSS v4 and Biome, prerendered to static HTML.

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # prerenders every page into dist/client
pnpm check        # lint + format (Biome)
pnpm typecheck
pnpm test
pnpm thumbnails   # with the dev server running: re-capture lab thumbnails
```

## Where things live

- `src/content/` — all site content as typed data: experiments, web work, art, résumé (EN/中文).
- `src/routes/` — file-based routes; pages only lay content out.
- `src/sketches/` — the p5.js / three.js / canvas sketches, loaded in the browser on demand.
- `src/components/FlowField.tsx` — the interactive flow field on the home page.

### Adding an experiment

1. Put the sketch in `src/sketches/labs/<n>/index.ts` as a class that takes the container element
   and has an optional `destroy()`.
2. Add an entry at the top of `experiments` in `src/content/experiments.ts`.
3. Add a `/exp/Lab<n>` redirect in `vercel.json` (a test checks this).
4. Run `pnpm thumbnails <slug>` with the dev server up.

Design and architecture decisions are recorded in [docs/DECISIONS.md](docs/DECISIONS.md).
