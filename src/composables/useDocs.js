import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { projects } from '@/data/projects.js'

export function useDocs() {
  const route = useRoute()

  const currentProject = computed(() => {
    const projectSlug = route.params.project
    return projectSlug ? projects[projectSlug] || null : null
  })

  const currentSection = computed(() => {
    const project = currentProject.value
    if (!project || !route.params.section) return null
    return project.sections[route.params.section] || null
  })

  const projectList = computed(() => {
    return Object.entries(projects).map(([slug, data]) => ({ slug, ...data }))
  })

  function getEditUrl(projectSlug, sectionSlug, pageSlug) {
    const project = projects[projectSlug]
    const repo = project?.repo || 'https://github.com/your-org'
    return `${repo}/edit/main/docs/${sectionSlug}/${pageSlug}.md`
  }

  return {
    projects,
    projectList,
    currentProject,
    currentSection,
    getEditUrl,
  }
}
