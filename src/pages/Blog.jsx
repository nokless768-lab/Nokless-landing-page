import { Link } from 'react-router-dom'
import SiteNav from '../components/SiteNav.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import { posts } from '../lib/posts.js'
import { useSeo } from '../lib/seo.js'

export default function Blog() {
  useSeo({ title: 'Nokless Blog — Visitor management & access security guides', description: 'Guides and ideas on visitor management, estate security, hotel check-in and hospital access from Nokless.' })
  return (
    <>
      <SiteNav />
      <main>
        <section className="section blog-section"><div className="container">
          <div className="eyebrow">The Nokless Blog</div>
          <h1 className="page-title">Ideas for safer spaces.</h1>
          <p className="section-lede">Practical guides on visitor management, estate security and modern access.</p>
          <div className="blog-grid">{posts.map((p) => <PostCard key={p.slug} post={p} />)}</div>
        </div></section>
      </main>
      <SiteFooter />
    </>
  )
}

export function PostCard({ post }) {
  return (
    <article className="blog-card">
      <Link to={`/blog/${post.slug}`} className="blog-art"><span>{post.tag}</span><b>{post.title.slice(0, 1)}</b></Link>
      <div className="blog-meta"><span>{post.tag}</span><span>{post.date}</span></div>
      <h3><Link to={`/blog/${post.slug}`}>{post.title}</Link></h3>
      <p>{post.description}</p>
      <Link to={`/blog/${post.slug}`} className="card-arrow">Read post →</Link>
    </article>
  )
}
