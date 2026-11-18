import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

const documentationProjects = new Set([
  'econpile',
  'plasma',
  'rokko',
  'project-one',
  'project-two',
  'project-three',
])

const documentationSpaFallback = {
  name: 'documentation-spa-fallback',
  configureServer(server) {
    // `D:\plasma` exists outside this workspace. Without this early rewrite,
    // Vite mistakes `/plasma` for that directory/package on a browser refresh.
    server.middlewares.use((req, _res, next) => {
      const pathname = (req.url || '').split('?')[0]
      const project = pathname.split('/')[1]
      const acceptsHtml = (req.headers.accept || '').includes('text/html')

      if (req.method === 'GET' && acceptsHtml && documentationProjects.has(project)) {
        req.url = '/index.html'
      }
      next()
    })
  },
}

export default defineConfig({
  plugins: [documentationSpaFallback, vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '~': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
  },
})
