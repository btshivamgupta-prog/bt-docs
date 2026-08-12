<template>
  <aside
    class="flex flex-col h-full bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm border-r border-gray-200 dark:border-gray-800 overflow-y-auto scrollbar-thin"
  >
    <!-- Logo / Home link -->
    <div class="flex items-center gap-3 px-4 py-4 border-b border-gray-200 dark:border-gray-800">
      <router-link to="/" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
          BT
        </div>
        <span class="font-semibold text-gray-900 dark:text-white">BT Docs</span>
      </router-link>
    </div>

    <!-- Projects list -->
    <div class="flex-1 px-3 py-4 space-y-2">
      <div v-for="project in projectList" :key="project.slug">
        <!-- Project header row (whole row toggles open/close) -->
        <div
          role="button"
          tabindex="0"
          class="flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold cursor-pointer select-none transition-colors duration-150"
          :class="isProjectActive(project.slug)
            ? 'bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300'
            : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'"
          @click="toggleProject(project.slug)"
          @keydown.enter="toggleProject(project.slug)"
          @keydown.space.prevent="toggleProject(project.slug)"
        >
          <svg
            class="w-3.5 h-3.5 shrink-0 transition-transform duration-200"
            :class="isExpanded(project.slug) ? 'rotate-90' : ''"
            fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
          <span class="text-base">{{ project.icon }}</span>
          <span class="truncate">{{ project.name }}</span>
        </div>

        <!-- Sections (shown when expanded) -->
        <div v-if="isExpanded(project.slug)" class="ml-4 mt-1 space-y-3">
          <div v-for="(section, sectionSlug) in project.sections" :key="sectionSlug">
            <p class="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {{ section.title }}
            </p>
            <!-- Recursive menu: renders pages + nested children at any depth -->
            <SidebarMenu
              :items="section.pages"
              :base-path="`/${project.slug}/${sectionSlug}`"
              :depth="1"
              :segments="segments"
              @navigate="$emit('navigate')"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom: GitHub link -->
    <div class="px-4 py-3 border-t border-gray-200 dark:border-gray-800 space-y-2">
      <a
        href="https://github.com"
        target="_blank"
        class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        GitHub
      </a>
    </div>
  </aside>
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDocs } from '@/composables/useDocs'
import SidebarMenu from '@/components/SidebarMenu.vue'

export default {
  name: 'AppSidebar',
  components: { SidebarMenu },
  emits: ['navigate'],
  setup(props, { emit }) {
    const route = useRoute()
    const router = useRouter()
    const { projectList, segments } = useDocs()

    const initialSlug = route.params.project || projectList.value[0]?.slug
    const expandedProjects = ref(new Set(initialSlug ? [initialSlug] : []))

    function isProjectActive(projectSlug) {
      if (route.params.project === projectSlug) return true
      if (!route.params.project) return projectSlug === projectList.value[0]?.slug
      return false
    }

    function isExpanded(projectSlug) {
      return expandedProjects.value.has(projectSlug)
    }

    function toggleProject(projectSlug) {
      const set = new Set(expandedProjects.value)
      const opening = !set.has(projectSlug)
      if (opening) {
        set.add(projectSlug)
      } else {
        set.delete(projectSlug)
      }
      expandedProjects.value = set
      if (opening && route.params.project !== projectSlug) {
        router.push(`/${projectSlug}`)
      }
      emit('navigate')
    }

    return { projectList, segments, isProjectActive, isExpanded, toggleProject }
  },
}
</script>
