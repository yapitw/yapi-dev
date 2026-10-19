import { defineConfig } from 'vitest/config'

// Kept separate from vite.config.ts so tests don't boot the TanStack Start plugin.
export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: { environment: 'node' },
})
