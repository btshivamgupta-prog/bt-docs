<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Mobile overlay -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-40 bg-black/50 lg:hidden"
      @click="sidebarOpen = false"
    />

    <!-- Sidebar -->
    <Sidebar
      :class="[
        'fixed inset-y-0 left-0 z-50 w-[280px] transform transition-transform duration-300 lg:relative lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
      ]"
      @navigate="sidebarOpen = false"
    />

    <!-- Main content area -->
    <div class="flex flex-1 flex-col overflow-hidden">
      <!-- Scroll progress bar -->
      <div class="h-0.5 bg-transparent relative">
        <div
          class="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-500 to-primary-400 transition-[width] duration-100"
          :style="{ width: progress + '%' }"
        />
      </div>

      <!-- Top header bar -->
      <TopHeader @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <!-- Page content -->
      <main ref="mainEl" class="flex-1 overflow-y-auto scrollbar-thin" @scroll="onScroll">
        <div class="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <Transition name="page" mode="out-in">
            <slot />
          </Transition>
        </div>
      </main>

      <!-- Back to top -->
      <Transition name="fade">
        <button
          v-if="showBackTop"
          class="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700 transition-colors"
          aria-label="Back to top"
          @click="scrollToTop"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
          </svg>
        </button>
      </Transition>

      <!-- Footer -->
      <footer class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-6 py-4">
        <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Copyright &copy; {{ new Date().getFullYear() }}</span>
          <span>Built with Vue 3 + Vite</span>
        </div>
      </footer>
    </div>

    <!-- Global search palette -->
    <SearchPalette />
  </div>
</template>

<script>
import { ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import TopHeader from '@/components/TopHeader.vue'
import SearchPalette from '@/components/SearchPalette.vue'

export default {
  name: 'DefaultLayout',
  components: { Sidebar, TopHeader, SearchPalette },
  setup() {
    const sidebarOpen = ref(false)
    const mainEl = ref(null)
    const progress = ref(0)
    const showBackTop = ref(false)

    function onScroll() {
      const el = mainEl.value
      if (!el) return
      const max = el.scrollHeight - el.clientHeight
      progress.value = max > 0 ? (el.scrollTop / max) * 100 : 0
      showBackTop.value = el.scrollTop > 400
    }

    function scrollToTop() {
      mainEl.value && mainEl.value.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return { sidebarOpen, mainEl, progress, showBackTop, onScroll, scrollToTop }
  },
}
</script>
