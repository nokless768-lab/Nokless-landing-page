// Runs after `vite build`. Writes a real index.html for every route
// (/blog, /blog/<slug>, /privacy, /terms) so ANY static host serves them
// directly, with no rewrite rules, and search engines see per-page titles.
import fs from 'node:fs'
import path from 'node:path'

const dist = 'dist'
const base = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const src = fs.readFileSync('src/lib/posts.js', 'utf8').replace('export const posts', 'const posts')
const posts = new Function(`${src}; return posts`)()
const SITE = (process.env.SITE_URL || '').replace(/\/$/, '')
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function page(route, title, description) {
  let html = base
    .replace(/<title>.*?<\/title>/s, `<title>${esc(title)}</title>`)
    .replace(/<meta name="description"[^>]*>/, '')
    .replace('</head>', `    <meta name="description" content="${esc(description)}" />\n    <meta property="og:title" content="${esc(title)}" />\n    <meta property="og:description" content="${esc(description)}" />\n${SITE ? `    <link rel="canonical" href="${SITE}${route}" />\n` : ''}  </head>`)
  const dir = path.join(dist, route)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), html)
}

const routes = ['/']
page('/blog', 'Nokless Journal — Visitor management & access security guides', 'Guides and ideas on visitor management, estate security, hotel check-in and hospital access from Nokless.'); routes.push('/blog')
for (const p of posts) { page(`/blog/${p.slug}`, `${p.title} | Nokless`, p.description); routes.push(`/blog/${p.slug}`) }
page('/privacy', 'Privacy Policy | Nokless', 'Privacy Policy for Nokless Technologies Limited.'); routes.push('/privacy')
page('/terms', 'Terms of Service | Nokless', 'Terms of Service for Nokless Technologies Limited.'); routes.push('/terms')

// Catch-all for hosts that support a custom 404 page (GitHub Pages, Firebase, etc.)
fs.writeFileSync(path.join(dist, '404.html'), base)

if (SITE) {
  fs.writeFileSync(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((r) => `  <url><loc>${SITE}${r}</loc></url>`).join('\n')}\n</urlset>\n`)
  fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`)
}
console.log(`postbuild: wrote ${routes.length - 1} route pages${SITE ? ' + sitemap' : ''}`)
