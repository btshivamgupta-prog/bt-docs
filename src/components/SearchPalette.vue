<template>
  <Teleport to="body">
    <Transition name="palette">
      <!-- Modal overlay -->
      <div
        v-if="open"
        class="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm p-4 pt-[12vh]"
        @click.self="closePalette"
      >
        <div
          class="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          role="dialog"
          aria-modal="true"
        >
          <!-- Input row -->
          <div class="flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              ref="inputEl"
              v-model="query"
              type="text"
              placeholder="Search docs & requirements..."
              class="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none text-sm"
              @keydown.down.prevent="move(1)"
              @keydown.up.prevent="move(-1)"
              @keydown.enter.prevent="go(activeIndex)"
              @keydown.esc="closePalette"
            />
            <kbd class="text-xs text-gray-400 px-1.5 py-0.5 rounded border border-gray-300 dark:border-gray-600">esc</kbd>
          </div>

          <!-- Results -->
          <div v-if="results.length" ref="listEl" class="max-h-[50vh] overflow-y-auto py-2 scrollbar-thin">
            <button
              v-for="(r, i) in results"
              :key="r.fullPath + r.title"
              class="w-full flex items-start gap-3 px-4 py-2.5 text-left transition-colors"
              :class="i === activeIndex
                ? 'bg-primary-50 dark:bg-primary-950/60'
                : 'hover:bg-gray-50 dark:hover:bg-gray-800/60'"
              @mouseenter="activeIndex = i"
              @click="go(i)"
            >
              <span class="mt-0.5 text-base">{{ r.icon }}</span>
              <span class="flex-1 min-w-0">
                <span class="block truncate text-sm font-medium text-gray-900 dark:text-white">{{ r.title }}</span>
                <span class="block truncate text-xs text-gray-500 dark:text-gray-400">
                  {{ r.projectName }} · {{ r.sectionTitle }}
                </span>
              </span>
            </button>
          </div>

          <!-- Empty state -->
          <div v-else class="px-4 py-8 text-center text-sm text-gray-400 dark:text-gray-500">
            {{ query ? 'No results found.' : 'Type to search across all pages.' }}
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSearchPalette } from '@/composables/useSearchPalette'
import { useDocs } from '@/composables/useDocs'

const ICONS = ['📄', '📋', '⚙️', '🛠️', '🚀', '📌', '🗂️', '🧩']

export default {
  name: 'SearchPalette',
  setup() {
    const router = useRouter()
    const { open, query, closePalette } = useSearchPalette()
    const { allPages } = useDocs()
    const inputEl = ref(null)
    const activeIndex = ref(0)

    // Filter across docs AND requirements entries
    const results = computed(() => {
      const q = query.value.trim().toLowerCase()
      if (!q) return allPages.value.slice(0, 8).map(addIcon)
      const list = allPages.value
        .filter((p) =>
          (p.title + ' ' + p.sectionTitle + ' ' + p.projectName + ' ' + p.path.join(' '))
            .toLowerCase().includes(q)
        )
        .slice(0, 12)
      return list.map(addIcon)
    })

    function addIcon(p, i) {
      return { ...p, icon: ICONS[i % ICONS.length] }
    }

    watch(query, () => { activeIndex.value = 0 })
    watch(open, async (isOpen) => {
      if (isOpen) await nextTick(); inputEl.value && inputEl.value.focus()
    })

    function move(dir) {
      const n = results.value.length
      activeIndex.value = (activeIndex.value + dir + n) % n
    }

    function go(i) {
      const r = results.value[i]
      if (!r) return
      closePalette()
      router.push(r.fullPath)
    }

    // Global keyboard shortcuts: Cmd/Ctrl+K or '/' to open, Esc handled inline
    function onKeydown(e) {
      const combo = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k'
      if ((e.key === '/' && !isTyping(e)) || combo) {
        e.preventDefault()
        open.value = true
        nextTick(() => inputEl.value && inputEl.value.focus())
      }
    }
    function isTyping(e) {
      const t = e.target
      return t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)
    }

    onMounted(() => document.addEventListener('keydown', onKeydown))
    onUnmounted(() => document.removeEventListener('keydown', onKeydown))

    return { open, query, results, activeIndex, inputEl, move, go, closePalette }
  },
}
</script>