import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { projects } from '@/data/projects.js'

export function useDocs() {
  const route = useRoute()

  const currentProject = computed(() => {
    const projectSlug = route.params.project
    if (!projectSlug) return null
    const data = projects[projectSlug]
    if (!data) return null
    // Include the slug so components can build links like /{slug}/section
    return { ...data, slug: projectSlug }
  })

  // Segments after the project slug, e.g. ['getting-started', 'bom-product', 'overview']
  const segments = computed(() => route.params.pathMatch || [])

  const currentSection = computed(() => {
    const project = currentProject.value
    if (!project || !segments.value[0]) return null
    return project.sections[segments.value[0]] || null
  })

  // Walk the tree (section → page → child → …) to find the node the URL points to.
  const currentPage = computed(() => {
    const section = currentSection.value
    if (!section) return null

    let node = null
    let items = section.pages
    for (let i = 1; i < segments.value.length; i++) {
      node = (items || []).find((p) => p.slug === segments.value[i])
      if (!node) return null
      items = node.children
    }
    return node
  })

  const projectList = computed(() => {
    return Object.entries(projects).map(([slug, data]) => ({ slug, ...data }))
  })

  // Content path for the current URL, e.g. /content/project-one/getting-started/bom-product/overview.md
  function getContentPath(projectSlug, segs) {
    if (!segs || segs.length === 0) return null
    return `/content/${projectSlug}/${segs.join('/')}.md`
  }

  function getContentPathForSegments(segs) {
    if (!route.params.project || !segs || segs.length === 0) return null
    return `/content/${route.params.project}/${segs.join('/')}.md`
  }

  function getEditUrl(projectSlug, segs) {
    const project = projects[projectSlug]
    const repo = project?.repo || 'https://github.com/your-org'
    const path = (segs || []).join('/')
    return `${repo}/edit/main/docs/${path}.md`
  }

  return {
    projects,
    projectList,
    currentProject,
    currentSection,
    currentPage,
    segments,
    getContentPath,
    getContentPathForSegments,
    getEditUrl,
  }
}
