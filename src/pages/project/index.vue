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
      <div class="text-6xl mb-4">📄</div>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Project Not Found</h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">The project you are looking for does not exist.</p>
      <router-link
        to="/"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
      >
        ← Back to Home
      </router-link>
    </div>

    <!-- Documentation content (only when a leaf page resolves) -->
    <div v-else-if="!showLanding">
      <!-- Mobile / small-screen collapsible TOC -->
      <details v-if="toc.length" class="lg:hidden mb-6 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
        <summary class="cursor-pointer text-sm font-semibold text-gray-700 dark:text-gray-300 select-none">
          📑 On this page
        </summary>
        <ul class="mt-3 space-y-1.5 text-sm">
          <li v-for="parent in tocTree" :key="parent.slug">
            <a
              :href="'#' + parent.slug"
              class="block rounded px-1 py-0.5 font-medium text-gray-800 dark:text-gray-200 transition-colors"
              :class="activeSlug === parent.slug
                ? 'bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300'
                : 'hover:text-primary-600 dark:hover:text-primary-400'"
              @click.prevent="scrollToHeading(parent.slug)"
            >{{ parent.text }}</a>
            <ul v-if="parent.children.length" class="ml-3 mt-0.5 space-y-0.5 border-l border-gray-200 dark:border-gray-800 pl-2">
              <li v-for="child in parent.children" :key="child.slug">
                <a
                  :href="'#' + child.slug"
                  class="block rounded px-1 py-0.5 text-gray-500 dark:text-gray-400 transition-colors"
                  :class="activeSlug === child.slug
                    ? 'bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300'
                    : 'hover:text-primary-600 dark:hover:text-primary-400'"
                  @click.prevent="scrollToHeading(child.slug)"
                >{{ child.text }}</a>
              </li>
            </ul>
          </li>
        </ul>
      </details>

      <div class="flex items-start gap-10">
        <!-- Article body -->
        <div class="prose flex-1 min-w-0" v-html="renderedContent"></div>

        <!-- Sticky table of contents (large screens) -->
        <nav
          v-if="toc.length"
          class="hidden lg:block w-60 shrink-0 sticky top-8 self-start max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-thin pl-5 border-l border-gray-200 dark:border-gray-800"
        >
          <p class="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
            On this page
          </p>
          <ul class="space-y-1 text-sm">
            <li v-for="parent in tocTree" :key="parent.slug">
              <a
                :href="'#' + parent.slug"
                class="block border-l-2 py-1 pl-3 transition-colors"
                :class="{
                  'border-primary-500 text-primary-600 dark:text-primary-400 font-semibold':
                    activeSlug === parent.slug,
                  'border-transparent text-gray-700 dark:text-gray-200 font-medium hover:text-primary-600 dark:hover:text-primary-400':
                    activeSlug !== parent.slug,
                }"
                @click.prevent="scrollToHeading(parent.slug)"
              >{{ parent.text }}</a>

              <!-- H2 children of this H1 -->
              <ul v-if="parent.children.length" class="mt-0.5 space-y-0.5">
                <li v-for="child in parent.children" :key="child.slug">
                  <a
                    :href="'#' + child.slug"
                    class="block py-0.5 pl-3 text-gray-500 dark:text-gray-400 transition-colors"
                    :class="activeSlug === child.slug
                      ? 'text-primary-600 dark:text-primary-400 font-semibold'
                      : 'hover:text-primary-600 dark:hover:text-primary-400'"
                    @click.prevent="scrollToHeading(child.slug)"
                  >{{ child.text }}</a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Landing navigation (project / section / any parent node with children) -->
    <div v-else class="mt-8 space-y-10">
      <div v-for="(group, gi) in landingGroups" :key="group.title">
        <div class="flex items-center gap-2 mb-4">
          <span class="flex h-6 w-6 items-center justify-center rounded-md bg-primary-50 dark:bg-primary-950 text-primary-600 dark:text-primary-400 text-xs font-bold">
            {{ showAllSections ? gi + 1 : '▸' }}
          </span>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ group.title }}</h3>
        </div>
        <PageCards :items="group.items" :base-path="group.basePath" />
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
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useDocs } from '@/composables/useDocs'
import { useViewMode } from '@/composables/useViewMode'
import PageCards from '@/components/PageCards.vue'
import { marked } from 'marked'

export default {
  name: 'ProjectDocPage',
  components: { PageCards },
  setup() {
    const route = useRoute()
    const { currentProject, currentSection, currentPage, segments, getEditUrl } = useDocs()
    const { mode } = useViewMode()
    const pageContent = ref(null)
    const loading = ref(false)
    const toc = ref([])
    const activeSlug = ref(null)

    const editUrl = computed(() => {
      if (!route.params.project) return '#'
      const segs = mode.value === 'requirements'
        ? ['requirements', ...segments.value]
        : segments.value
      return getEditUrl(route.params.project, segs)
    })

    const renderedContent = computed(() => {
      if (!pageContent.value) return ''
      return renderMarkdown(pageContent.value)
    })
    const showLanding = computed(() => {
      const page = currentPage.value
      const segs = segments.value
      if (!currentProject.value) return false
      if (segs.length <= 1) return true
      if (page && page.children && page.children.length) return true
      return false
    })

    // True when the landing page lists every section of the project
    const showAllSections = computed(() => segments.value.length === 0)

    const landingGroups = computed(() => {
      const project = currentProject.value
      const segs = segments.value
      if (!project) return []
      // Project landing: show every section, each with its pages
      if (segs.length === 0) {
        return Object.entries(project.sections).map(([slug, s]) => ({
          title: s.title,
          items: s.pages,
          basePath: `/${project.slug}/${slug}`,
        }))
      }

      const section = currentSection.value
      if (!section) return []

      // Section landing: show this section's pages
      if (segs.length === 1) {
        return [{ title: section.title, items: section.pages, basePath: `/${project.slug}/${segs[0]}` }]
      }

      // Parent node landing: show its children
      const page = currentPage.value
      if (page && page.children && page.children.length) {
        return [{ title: page.title, items: page.children, basePath: `/${project.slug}/${segs.join('/')}` }]
      }

      return []
    })

    async function fetchContent() {
      const project = route.params.project
      const segs = segments.value
      if (!project || segs.length === 0 || showLanding.value) {
        pageContent.value = null
        return
      }

      loading.value = true
      try {
        // Docs live at /content/{project}/... ; requirements at /content/requirements/{project}/...
        const isReq = mode.value === 'requirements'
        const url = isReq
          ? `/content/requirements/${project}/${segs.join('/')}.md`
          : `/content/${project}/${segs.join('/')}.md`
        const response = await fetch(url)
        if (response.ok) {
          pageContent.value = await response.text()
        } else {
          pageContent.value = isReq
            ? generateRequirementsPlaceholder(project, segs)
            : generatePlaceholderContent(project, segs)
        }
      } catch {
        const isReq = mode.value === 'requirements'
        pageContent.value = isReq
          ? generateRequirementsPlaceholder(project, segs)
          : generatePlaceholderContent(project, segs)
      } finally {
        loading.value = false
      }
    }

    function generateRequirementsPlaceholder(project, segs) {
      const leaf = segs[segs.length - 1]
      const title = leaf.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
      const fileRef = 'content/requirements/' + project + '/' + segs.join('/') + '.md'
      return [
        '# ' + title + ' \u2014 Requirements',
        '',
        'No requirement document has been added for this page yet.',
        '',
        '> Add a requirement file at ' + fileRef + ' to edit this page.',
        '',
        '## Suggested structure',
        '',
        '- **Objective** \u2014 what this requirement aims to achieve.',
        '- **Stakeholders** \u2014 who is affected.',
        '- **Acceptance criteria** \u2014 how to verify it is met.',
        '',
      ].join('\n')
    }

        function generatePlaceholderContent(project, segs) {
      const leaf = segs[segs.length - 1]
      const title = leaf.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
      return `# ${title}

This is the documentation page for **${title}** in the ${project} project.

## Overview

This section provides detailed information about ${title.toLowerCase()}. Content for this page is being developed and will be available soon.

> **Note:** This is placeholder content. Replace it with actual documentation in the \`content/\` directory.
`
    }

    function renderMarkdown(md) {
      // Build an id per heading so anchor links / TOC work.
      const tocEntries = []
      const usedSlugs = new Set()
      const renderer = new marked.Renderer()

      renderer.heading = function (textOrToken, level) {
        const text = typeof textOrToken === 'string'
          ? textOrToken
          : String((textOrToken && textOrToken.text) || '')
        const depth = typeof level === 'number' ? level : (textOrToken && textOrToken.depth) || 1
        const slug = slugify(text, usedSlugs)
        tocEntries.push({ depth, text, slug })
        const anchor = `<a class="toc-anchor" href="#${slug}" aria-hidden="true" tabindex="-1">#</a>`
        return `<h${depth} id="${slug}">${text}${anchor}</h${depth}>`
      }

      const html = marked.parse(md, {
        gfm: true,
        renderer,
      })

      // Save the TOC for this page (reactive) — keeps ALL levels for anchors & scroll-spy
      toc.value = tocEntries
      return html
    }

    // TOC for display: only H1 as top-level items, with H2 nested under the
    // H1 that precedes them. H3+ are excluded from the index.
    const tocTree = computed(() => {
      const tree = []
      let current = null
      for (const item of toc.value) {
        if (item.depth === 1) {
          current = { ...item, children: [] }
          tree.push(current)
        } else if (item.depth === 2 && current) {
          current.children.push(item)
        }
        // depth > 2 is intentionally ignored in the sidebar index
      }
      return tree
    })

    function slugify(text, used) {
      const clean = text
        .replace(/`/g, '')                 // remove inline-code backticks
        .replace(/<[^>]+>/g, '')          // remove any html tags
      let base = clean
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
      if (!base) base = 'section'
      let slug = base
      let i = 2
      while (used.has(slug)) {
        slug = `${base}-${i}`
        i++
      }
      used.add(slug)
      return slug
    }

    onMounted(() => fetchContent())
    watch(() => route.fullPath, () => fetchContent())

    // ── Scroll-spy: highlight the TOC item for the section currently in view ──
    let observer = null

    function setupScrollSpy() {
      const article = document.querySelector('.prose')
      if (!observer && article) {
        observer = new IntersectionObserver(
          (entries) => {
            // Pick the entry that is nearest the top of the viewport.
            const visible = entries
              .filter((e) => e.isIntersecting)
              .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
            if (visible) activeSlug.value = visible.target.id
          },
          { root: null, rootMargin: '-15% 0px -70% 0px', threshold: 0 }
        )
      }
      // Observe the rendered headings
      document.querySelectorAll('.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6')
        .forEach((el) => observer && observer.observe(el))
    }

    // Re-run scroll-spy whenever new content is rendered
    watch(renderedContent, async () => {
      await nextTick()
      setupScrollSpy()
    })

    onUnmounted(() => {
      if (observer) observer.disconnect()
    })

    // Manually scroll to a heading. Used by TOC links to avoid the conflict
    // between native hash-jump and the router (which garbles the first click).
    function scrollToHeading(slug) {
      const el = document.getElementById(slug)
      if (!el) return
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return {
      currentProject,
      currentSection,
      pageContent,
      loading,
      editUrl,
      renderedContent,
      showLanding,
      landingGroups,
      showAllSections,
      toc,
      tocTree,
      activeSlug,
      scrollToHeading,
    }
  },
}
</script>