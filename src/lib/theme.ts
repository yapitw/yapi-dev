export type ThemeMode = 'light' | 'dark' | 'auto'

const STORAGE_KEY = 'theme'

/** Runs before first paint so a stored theme never flashes the wrong colours. */
export const THEME_INIT_SCRIPT = `(function(){try{var m=localStorage.getItem('${STORAGE_KEY}');if(m==='light'||m==='dark'){document.documentElement.setAttribute('data-theme',m)}}catch(e){}})();`

export function readThemeMode(): ThemeMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {}
  return 'auto'
}

export function applyThemeMode(mode: ThemeMode) {
  const root = document.documentElement
  if (mode === 'auto') root.removeAttribute('data-theme')
  else root.setAttribute('data-theme', mode)
  try {
    if (mode === 'auto') localStorage.removeItem(STORAGE_KEY)
    else localStorage.setItem(STORAGE_KEY, mode)
  } catch {}
  window.dispatchEvent(new Event('themechange'))
}

/** Reads a colour token off the root, e.g. `--pen`, for canvas drawing. */
export function readColorToken(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}
