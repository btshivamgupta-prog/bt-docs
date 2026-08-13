<template>
  <div>
    <!-- Hero section -->
    <div class="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-white via-gray-50 to-primary-50/40 dark:from-gray-900 dark:via-gray-900 dark:to-primary-950/30 px-6 py-14 md:px-12 md:py-20 mb-12">
      <!-- soft decorative blobs -->
      <div class="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary-400/10 blur-3xl"></div>
      <div class="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-primary-300/10 blur-3xl"></div>

      <div class="relative">
        <span class="inline-flex items-center gap-1.5 rounded-full border border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-950 px-3 py-1 text-xs font-medium text-primary-700 dark:text-primary-300">
          <span class="h-1.5 w-1.5 rounded-full bg-primary-500"></span>
          {{ projectCount }} projects documented
        </span>

        <h1 class="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Documentation,<br class="hidden sm:block" /> in one place.
        </h1>
        <p class="mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Explore docs &amp; requirements for all our projects. Find guides, references, and examples to build better.
        </p>

        <!-- Search entry -->
        <button
          class="mt-7 flex w-full max-w-md items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-left text-sm text-gray-400 dark:text-gray-500 shadow-sm transition hover:border-primary-300 dark:hover:border-primary-600"
          @click="openPalette"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <span class="flex-1">Search docs &amp; requirements…</span>
          <kbd class="rounded border border-gray-300 dark:border-gray-600 px-1.5 py-0.5 text-xs">/</kbd>
        </button>
      </div>
    </div>

    <!-- Projects grid -->
    <div>
      <h2 class="mb-6 text-lg font-semibold text-gray-900 dark:text-white">All projects</h2>
      <div class="grid gap-6 sm:grid-cols-2">
        <router-link
          v-for="project in projectList"
          :key="project.slug"
          :to="`/${project.slug}`"
          class="group relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-lg"
        >
          <div class="flex items-start gap-4">
            <span class="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-2xl transition-transform duration-200 group-hover:scale-110">
              {{ project.icon }}
            </span>
            <div class="min-w-0">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white transition-colors group-hover:text-primary-600 dark:group-hover:text-primary-400">
                {{ project.name }}
              </h3>
              <p class="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">{{ project.description }}</p>
              <div class="mt-3 flex flex-wrap gap-1.5">
                <span
                  v-for="(section, slug) in project.sections"
                  :key="slug"
                  class="inline-flex items-center rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs font-medium text-gray-600 dark:text-gray-400"
                >{{ section.title }}</span>
              </div>
            </div>
          </div>
          <div class="absolute right-4 top-5 text-gray-300 dark:text-gray-600 transition-all duration-200 group-hover:text-primary-500 group-hover:translate-x-0.5">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useDocs } from '@/composables/useDocs'
import { useSearchPalette } from '@/composables/useSearchPalette'

export default {
  name: 'HomePage',
  setup() {
    const { projectList } = useDocs()
    const { openPalette } = useSearchPalette()
    const projectCount = computed(() => projectList.value.length)
    return { projectList, openPalette, projectCount }
  },
}
</script>
