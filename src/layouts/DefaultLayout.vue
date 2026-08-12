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
      <!-- Top header bar -->
      <TopHeader @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <!-- Page content -->
      <main class="flex-1 overflow-y-auto scrollbar-thin">
        <div class="mx-auto max-w-4xl px-6 py-8 lg:px-8">
          <slot />
        </div>
      </main>

      <!-- Footer -->
      <footer class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-6 py-4">
        <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Copyright © {{ new Date().getFullYear() }}</span>
          <span>Built with Vue 3 + Vite</span>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import TopHeader from '@/components/TopHeader.vue'

export default {
  name: 'DefaultLayout',
  components: { Sidebar, TopHeader },
  setup() {
    const sidebarOpen = ref(false)
    return { sidebarOpen }
  },
}
</script>
