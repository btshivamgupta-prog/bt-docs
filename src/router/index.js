import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/index.vue'),
  },
  // Dynamic documentation routes
  {
    path: '/:project',
    name: 'project',
    component: () => import('@/pages/project/index.vue'),
  },
  {
    path: '/:project/:section',
    name: 'project-section',
    component: () => import('@/pages/project/index.vue'),
  },
  {
    path: '/:project/:section/:page',
    name: 'project-page',
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
