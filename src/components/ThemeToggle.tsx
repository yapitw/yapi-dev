import { useEffect, useState } from 'react'
import { applyThemeMode, readThemeMode, type ThemeMode } from '#/lib/theme'

const next: Record<ThemeMode, ThemeMode> = { auto: 'light', light: 'dark', dark: 'auto' }
const label: Record<ThemeMode, string> = { auto: 'Auto', light: 'Light', dark: 'Dark' }

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode | null>(null)

  useEffect(() => setMode(readThemeMode()), [])

  return (
    <button
      type="button"
      className="text-sm text-ink-soft hover:text-ink tabular-nums min-w-[3.5em] text-right"
      onClick={() => {
        const value = next[mode ?? 'auto']
        applyThemeMode(value)
        setMode(value)
      }}
      aria-label={`Colour theme: ${label[mode ?? 'auto']}. Switch to ${label[next[mode ?? 'auto']]}.`}
    >
      {/* Render nothing until mounted so the server and client markup agree. */}
      {mode ? label[mode] : ' '}
    </button>
  )
}
