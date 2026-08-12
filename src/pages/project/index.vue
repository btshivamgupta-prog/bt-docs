<template>
  <div>
    <!-- Project header -->
    <div v-if="currentProject" class="mb-10">
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">{{ currentProject.icon }}</span>
        <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
          {{ currentProject.name }}
        </h1>
      </div>
      <p class="text-lg text-gray-600 dark:text-gray-400">
        {{ currentProject.description }}
      </p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center gap-2 text-gray-500 py-12">
      <div class="w-4 h-4 border-2 border-gray-300 border-t-primary-600 rounded-full animate-spin"></div>
      <span>Loading documentation...</span>
    </div>

    <!-- Not found -->
    <div v-else-if="!currentProject" class="py-12 text-center">
      <div class="text-6xl mb-4">??</div>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Project Not Found</h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">The project you are looking for does not exist.</p>
      <router-link
        to="/"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
      >
        &larr; Back to Home
      </router-link>
    </div>

    <!-- Documentation content -->
    <div v-else class="prose" v-html="renderedContent"></div>

    <!-- Section navigation cards (shown on project landing or section landing) -->
    <div v-if="currentProject && !pageContent && !loading" class="mt-8">
      <div v-if="currentSection" class="grid gap-4 sm:grid-cols-2">
        <router-link
          v-for="page in currentSection.pages"
          :key="page.slug"
          :to="`/${$route.params.project}/${$route.params.section}/${page.slug}`"
          class="group rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-sm transition-all"
        >
          <h4 class="font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
            {{ page.title }}
          </h4>
        </router-link>
      </div>
      <div v-else class="space-y-8">
        <div v-for="(section, slug) in currentProject.sections" :key="slug">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">{{ section.title }}</h3>
          <div class="grid gap-3 sm:grid-cols-2">
            <router-link
              v-for="page in section.pages"
              :key="page.slug"
              :to="`/${$route.params.project}/${slug}/${page.slug}`"
              class="group rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-sm transition-all"
            >
              <h4 class="font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                {{ page.title }}
              </h4>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit on GitHub link -->
    <div v-if="pageContent" class="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
      <a
        :href="editUrl"
        target="_blank"
        class="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        Edit this page on GitHub
      </a>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useDocs } from '@/composables/useDocs'

export default {
  name: 'ProjectDocPage',
  setup() {
    const route = useRoute()
    const { currentProject, currentSection, getEditUrl } = useDocs()
    const pageContent = ref(null)
    const loading = ref(false)

    const editUrl = computed(() => {
      if (!route.params.project) return '#'
      return getEditUrl(route.params.project, route.params.section, route.params.page)
    })

    const renderedContent = computed(() => {
      if (!pageContent.value) return ''
      // Simple markdown-like rendering (in production, use a proper markdown parser)
      return renderMarkdown(pageContent.value)
    })

    async function fetchContent() {
      const { project, section, page } = route.params
      if (!project || !section || !page) {
        pageContent.value = null
        return
      }

      loading.value = true
      try {
        const url = `/content/${project}/${section}/${page}.md`
        const response = await fetch(url)
        if (response.ok) {
          pageContent.value = await response.text()
        } else {
          pageContent.value = generatePlaceholderContent(project, section, page)
        }
      } catch {
        pageContent.value = generatePlaceholderContent(project, section, page)
      } finally {
        loading.value = false
      }
    }

    function generatePlaceholderContent(project, section, page) {
      const title = page.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
      return `# ${title}

This is the documentation page for **${title}** in the ${project} project, under the ${section} section.

## Overview

This section provides detailed information about ${title.toLowerCase()}. Content for this page is being developed and will be available soon.

## Getting Started

To get started with ${title.toLowerCase()}, follow the steps below:

1. First, ensure you have all prerequisites installed
2. Configure your environment settings
3. Run the setup command

???? npm install
???? npm run setup

## Additional Resources

- [Official Documentation](#)
- [GitHub Repository](#)
- [Community Forum](#)

> **Note:** This is placeholder content. Replace it with actual documentation by creating markdown files in the \`content/\` directory.
`
    }

    function renderMarkdown(md) {
      // Basic markdown to HTML converter (for production, use marked or markdown-it)
      let html = md
        // Headings
        .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        .replace(/^# (.+)$/gm, '<h1>$1</h1>')
        // Bold & Italic
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        // Code blocks
        .replace(/``````(\w*)\n([\s\S]*?)``````/gm, '<pre><code class="language-$1">$2</code></pre>')
        .replace(/\`([^\`]+)\`/g, '<code>$1</code>')
        // Links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
        // Lists
        .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
        .replace(/^\- (.+)$/gm, '<li>$1</li>')
        // Blockquotes
        .replace(/^> (.+)$/gm, '<blockquote><p>$1</p></blockquote>')
        // Horizontal rules
        .replace(/^---$/gm, '<hr>')
        // Paragraphs (double newlines)
        .replace(/\n\n/g, '</p><p>')

      return '<p>' + html + '</p>'
    }

    onMounted(() => fetchContent())
    watch(() => route.fullPath, () => fetchContent())

    return {
      currentProject,
      currentSection,
      pageContent,
      loading,
      editUrl,
      renderedContent,
    }
  },
}
</script>
