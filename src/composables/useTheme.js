import { ref } from 'vue'

const THEME_KEY = 'bt_docs_theme'

// Read the saved theme: 'dark' | 'light' | null (null = follow system)
function getSavedTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY)
    return saved === 'dark' || saved === 'light' ? saved : null
  } catch {
    return null
  }
}

function systemPrefersDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

// Apply the theme class to <html> and return whether it's dark.
function applyTheme(isDark) {
  document.documentElement.classList.toggle('dark', isDark)
}

// Resolve the initial theme: saved preference first, then system preference.
function resolveInitial() {
  const saved = getSavedTheme()
  const dark = saved !== null ? saved === 'dark' : systemPrefersDark()
  applyTheme(dark)
  return dark
}

// Shared, reactive theme state (module-level singleton so all components stay in sync)
const isDark = ref(resolveInitial())

export function useTheme() {
  function toggleDark() {
    isDark.value = !isDark.value
    applyTheme(isDark.value)
    try {
      localStorage.setItem(THEME_KEY, isDark.value ? 'dark' : 'light')
    } catch {
      // ignore storage errors (e.g. private mode)
    }
  }

  return { isDark, toggleDark }
}