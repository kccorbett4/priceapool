import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, 'dist')

async function prerender() {
  // Import the SSR module (built by "vite build --ssr")
  const { render, getAllPaths } = await import('./dist/server/entry-server.js')

  // Read the client-built index.html as template
  const template = fs.readFileSync(path.resolve(distDir, 'index.html'), 'utf-8')

  const routes = getAllPaths()
  console.log(`Pre-rendering ${routes.length} pages...`)

  for (const url of routes) {
    const { html, helmet } = render(url)

    let page = template

    // Inject rendered HTML into the root div
    page = page.replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div>`
    )

    // Replace SEO head tags with helmet output (if helmet produced tags)
    if (helmet) {
      const titleStr = helmet.title.toString()
      const metaStr = helmet.meta.toString()
      const linkStr = helmet.link.toString()
      const scriptStr = helmet.script.toString()

      // Only replace if Helmet produced actual content
      if (titleStr || metaStr || linkStr) {
        const seoBlock = [
          titleStr,
          metaStr,
          linkStr,
        ].filter(Boolean).join('\n    ')

        page = page.replace(
          /<!--seo-head-start-->[\s\S]*?<!--seo-head-end-->/,
          seoBlock
        )
      }

      // Replace page-specific schema (FAQ/Article/Dataset)
      if (scriptStr) {
        page = page.replace(
          /<!--page-schema-start-->[\s\S]*?<!--page-schema-end-->/,
          scriptStr
        )
      } else {
        // No page-specific schema — remove the default one
        page = page.replace(
          /<!--page-schema-start-->[\s\S]*?<!--page-schema-end-->/,
          ''
        )
      }
    }

    // Determine output path
    const filePath = url === '/'
      ? path.resolve(distDir, 'index.html')
      : path.resolve(distDir, `${url.slice(1)}/index.html`)

    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFileSync(filePath, page)
  }

  console.log(`Done! ${routes.length} pages pre-rendered.`)
}

prerender().catch(err => {
  console.error('Pre-render failed:', err)
  process.exit(1)
})
