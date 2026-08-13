import { ref } from 'vue'

// Module-level singleton so the header button and the palette stay in sync.
const open = ref(false)
const query = ref('')

export function useSearchPalette() {
  function openPalette() {
    query.value = ''
    open.value = true
  }
  function closePalette() {
    open.value = false
  }
  return { open, query, openPalette, closePalette }
}