<template>
  <header
    class="sticky top-0 z-30 flex items-center gap-3 px-4 py-3 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 lg:px-6"
  >
    <!-- Mobile menu button -->
    <button
      class="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
      @click="$emit('toggle-sidebar')"
      aria-label="Toggle sidebar"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    </button>

    <!-- Breadcrumb / Project name -->
    <div class="flex items-center gap-2 text-sm flex-1">
      <template v-if="currentProject">
        <router-link to="/" class="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
          Docs
        </router-link>
        <span class="text-gray-400 dark:text-gray-600">/</span>
        <span class="font-medium text-gray-900 dark:text-white">{{ currentProject.name }}</span>
        <template v-if="currentSection">
          <span class="text-gray-400 dark:text-gray-600">/</span>
          <span class="text-gray-700 dark:text-gray-300">{{ currentSection.title }}</span>
        </template>
      </template>
      <template v-else>
        <span class="font-medium text-gray-900 dark:text-white">Documentation</span>
      </template>
    </div>

    <!-- Right side actions -->
    <div class="flex items-center gap-1">
      <!-- Docs / Requirement toggle -->
      <div class="hidden md:flex items-center rounded-lg p-0.5 border border-gray-200 dark:border-gray-700 mr-1">
        <button
          class="px-2.5 py-1 rounded-md text-xs font-semibold transition-colors"
          :class="mode === 'docs'
            ? 'bg-primary-600 text-white'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'"
          @click="setMode('docs')"
        >Docs</button>
        <button
          class="px-2.5 py-1 rounded-md text-xs font-semibold transition-colors"
          :class="mode === 'requirements'
            ? 'bg-primary-600 text-white'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'"
          @click="setMode('requirements')"
        >Requirement</button>
      </div>

      <!-- Search placeholder -->
      <button
        class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors min-w-[200px]"
        @click="openPalette"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <span>Search docs...</span>
        <kbd class="ml-auto text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">/</kbd>
      </button>


      <!-- Accent color picker -->
      <div ref="accentWrap" class="relative">
        <button
          class="flex items-center gap-1.5 p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          @click="accentOpen = !accentOpen"
          :aria-label="'Accent color: ' + currentAccent.name"
          :title="'Accent color: ' + currentAccent.name"
        >
          <span
            class="w-4 h-4 rounded-full ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-950 ring-gray-200 dark:ring-gray-700"
            :style="{ backgroundColor: currentAccent.swatch }"
          ></span>
          <svg
            class="w-3.5 h-3.5 transition-transform"
            :class="accentOpen ? 'rotate-180' : ''"
            fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </button>

        <Transition name="fade">
          <div
            v-if="accentOpen"
            class="absolute right-0 mt-2 w-48 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl p-1.5 z-50"
          >
            <p class="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Accent color
            </p>
            <button
              v-for="a in accents"
              :key="a.id"
              class="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors"
              :class="accent === a.id ? 'bg-primary-50 dark:bg-primary-950/60' : 'hover:bg-gray-50 dark:hover:bg-gray-800/60'"
              @click="chooseAccent(a.id)"
            >
              <span class="w-4 h-4 rounded-full shrink-0" :style="{ backgroundColor: a.swatch }"></span>
              <span class="flex-1 text-left text-gray-700 dark:text-gray-200">{{ a.name }}</span>
              <svg
                v-if="accent === a.id"
                class="w-4 h-4 text-primary-600"
                fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </button>
          </div>
        </Transition>
      </div>

      <!-- Dark mode toggle -->
      <button
        class="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
        @click="toggleDark"
        aria-label="Toggle dark mode"
      >
        <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
        </svg>
      </button>
    </div>
  </header>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useDocs } from '@/composables/useDocs'
import { useTheme } from '@/composables/useTheme'
import { useViewMode } from '@/composables/useViewMode'
import { useSearchPalette } from '@/composables/useSearchPalette'
import { useAccentColor } from '@/composables/useAccentColor'

export default {
  name: 'TopHeader',
  emits: ['toggle-sidebar'],
  setup() {
    const { currentProject, currentSection } = useDocs()
    const { isDark, toggleDark } = useTheme()
    const { mode, setMode } = useViewMode()
    const { openPalette } = useSearchPalette()
    const { accent, currentAccent, setAccent, accents } = useAccentColor()

    // Accent color picker dropdown state + click-outside handling
    const accentOpen = ref(false)
    const accentWrap = ref(null)

    function chooseAccent(id) {
      setAccent(id)
      accentOpen.value = false
    }

    function onDocClick(e) {
      if (accentWrap.value && !accentWrap.value.contains(e.target)) {
        accentOpen.value = false
      }
    }

    onMounted(() => document.addEventListener('click', onDocClick))
    onUnmounted(() => document.removeEventListener('click', onDocClick))

    return {
      currentProject,
      currentSection,
      isDark,
      toggleDark,
      mode,
      setMode,
      openPalette,
      accent,
      currentAccent,
      accents,
      accentOpen,
      accentWrap,
      chooseAccent,
    }
  },
}
</script>

