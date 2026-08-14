import { ref, computed } from 'vue'

const ACCENT_KEY = 'bt_docs_accent'

/**
 * Accent color palettes the user can pick from.
 * Each palette stores its shades as space-separated RGB triplets so Tailwind's
 * `<alpha-value>` opacity modifiers keep working (e.g. bg-primary-600/80).
 */
export const ACCENTS = [
  {
    id: 'blue',
    name: 'Blue',
    swatch: '#2563eb',
    colors: {
      50: '239 246 255',
      100: '219 234 254',
      200: '191 219 254',
      300: '147 197 253',
      400: '96 165 250',
      500: '59 130 246',
      600: '37 99 235',
      700: '29 78 216',
      800: '30 64 175',
      900: '30 58 138',
      950: '23 37 84',
    },
  },
  {
    id: 'emerald',
    name: 'Emerald',
    swatch: '#059669',
    colors: {
      50: '236 253 245',
      100: '209 250 229',
      200: '167 243 208',
      300: '110 231 183',
      400: '52 211 153',
      500: '16 185 129',
      600: '5 150 105',
      700: '4 120 87',
      800: '6 95 70',
      900: '6 78 59',
      950: '2 44 34',
    },
  },
  {
    id: 'violet',
    name: 'Violet',
    swatch: '#7c3aed',
    colors: {
      50: '245 243 255',
      100: '237 233 254',
      200: '221 214 254',
      300: '196 181 253',
      400: '167 139 250',
      500: '139 92 246',
      600: '124 58 237',
      700: '109 40 217',
      800: '91 33 182',
      900: '76 29 149',
      950: '46 16 101',
    },
  },
  {
    id: 'rose',
    name: 'Rose',
    swatch: '#e11d48',
    colors: {
      50: '255 241 242',
      100: '255 228 230',
      200: '254 205 211',
      300: '253 164 175',
      400: '251 113 133',
      500: '244 63 94',
      600: '225 29 72',
      700: '190 18 60',
      800: '159 18 57',
      900: '136 19 55',
      950: '76 5 25',
    },
  },
]

const DEFAULT_ACCENT = 'blue'

// Read the saved accent, falling back to the default when unknown.
function getSavedAccent() {
  try {
    const saved = localStorage.getItem(ACCENT_KEY)
    return ACCENTS.some((a) => a.id === saved) ? saved : DEFAULT_ACCENT
  } catch {
    return DEFAULT_ACCENT
  }
}

// Write the palette's shades onto <html> as CSS custom properties.
function applyAccent(id) {
  const accent = ACCENTS.find((a) => a.id === id) || ACCENTS[0]
  const root = document.documentElement
  for (const [shade, value] of Object.entries(accent.colors)) {
    root.style.setProperty(`--primary-${shade}`, value)
  }
  return accent
}

// Shared, reactive accent state (module-level singleton so all components stay in sync)
const accent = ref(getSavedAccent())
applyAccent(accent.value)

const currentAccent = computed(() => ACCENTS.find((a) => a.id === accent.value) || ACCENTS[0])

export function useAccentColor() {
  function setAccent(id) {
    if (!ACCENTS.some((a) => a.id === id)) return
    accent.value = id
    applyAccent(id)
    try {
      localStorage.setItem(ACCENT_KEY, id)
    } catch {
      // ignore storage errors (e.g. private mode)
    }
  }

  return { accent, currentAccent, setAccent, accents: ACCENTS }
}
