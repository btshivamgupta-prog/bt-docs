import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

/**
 * Docs / Requirement view mode.
 *
 * The mode is carried in the URL as a query param (?mode=requirements) so a
 * developer or manager can share a direct link to a specific requirement doc.
 * When mode is 'docs' the query param is omitted for cleaner URLs.
 */
export function useViewMode() {
  const route = useRoute()
  const router = useRouter()

  const mode = computed(() => {
    return route.query.mode === 'requirements' ? 'requirements' : 'docs'
  })

  function setMode(next) {
    const q = { ...route.query }
    if (next === 'requirements') {
      q.mode = 'requirements'
    } else {
      delete q.mode
    }
    router.replace({ query: q })
  }

  return { mode, setMode }
}