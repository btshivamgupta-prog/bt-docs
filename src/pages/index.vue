<template>
  <div>
    <!-- Hero section -->
    <div class="py-12 md:py-20">
      <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        BT Documentation
      </h1>
      <p class="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
        Explore comprehensive documentation for all our projects. Find guides, API references, and examples to help you build better.
      </p>
      <p class="mt-4 text-sm text-gray-400 dark:text-gray-500">
        Want to add a new project? Just edit <code class="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-xs">src/data/projects.js</code> and drop markdown files into <code class="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-xs">public/content/</code>.
      </p>
    </div>

    <!-- Projects grid -->
    <div class="grid gap-6 sm:grid-cols-2">
      <router-link
        v-for="project in projectList"
        :key="project.slug"
        :to="`/${project.slug}`"
        class="group relative rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md transition-all duration-200 bg-white dark:bg-gray-900"
      >
        <div class="flex items-start gap-4">
          <span class="text-3xl">{{ project.icon }}</span>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {{ project.name }}
            </h3>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {{ project.description }}
            </p>
            <div class="mt-3 flex flex-wrap gap-1.5">
              <span
                v-for="(section, slug) in project.sections"
                :key="slug"
                class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
              >
                {{ section.title }}
              </span>
            </div>
          </div>
        </div>
        <div class="absolute right-4 top-4 text-gray-300 dark:text-gray-600 group-hover:text-primary-500 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { useDocs } from '@/composables/useDocs'

export default {
  name: 'HomePage',
  setup() {
    const { projectList } = useDocs()
    return { projectList }
  },
}
</script>
