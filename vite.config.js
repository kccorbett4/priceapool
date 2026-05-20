import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Detect whether this Vite invocation is the SSR build.
// We only apply manual chunking to the client build — SSR needs a single
// emit that prerender.js can require/import as one module.
const isSsrBuild = process.argv.includes('--ssr')

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    ...(isSsrBuild
      ? {}
      : {
          rollupOptions: {
            output: {
              manualChunks(id) {
                if (id.includes('node_modules')) {
                  if (id.includes('react-helmet-async')) return 'helmet'
                  if (id.includes('react-router')) return 'router'
                  if (id.includes('react-dom')) return 'react-dom'
                  if (id.includes('/react/') || id.endsWith('/react.js')) return 'react'
                  return 'vendor'
                }
              },
            },
          },
        }),
  },
})
