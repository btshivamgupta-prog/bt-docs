import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/index.vue'),
  },
  // Catch-all for documentation — supports nested pages at any depth.
  // pathMatch = array of segments after the project slug, e.g.
  //   /project-one/getting-started/bom-product/overview
  // → pathMatch: ['getting-started', 'bom-product', 'overview']
  {
    path: '/:project/:pathMatch(.*)*',
    name: 'project',
    component: () => import('@/pages/project/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})

export default router
