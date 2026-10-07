import { Link } from 'react-router-dom'
import SiteNav from '../components/SiteNav.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import { posts } from '../lib/posts.js'
import { useSeo } from '../lib/seo.js'

export default function Blog() {
  useSeo({ title: 'Nokless Blog — News and stories', description: 'News and stories from the team building Nokless, the hardware-free access management platform.' })
  return (
    <>
      <SiteNav />
      <main><section className="section blog-section"><div className="container">
        <div className="eyebrow">The Nokless Blog</div>
        <h1 className="page-title">News and stories.</h1>
        <p className="section-lede">Updates from the team building smarter, simpler access.</p>
        {posts.length ? <div className="blog-grid">{posts.map((p) => <PostCard key={p.slug} post={p} />)}</div> : <div className="blog-empty"><strong>Nothing here yet.</strong><span>Stories and news about what we are building are coming soon.</span></div>}
      </div></section></main>
      <SiteFooter />
    </>
  )
}

export function PostCard({ post }) {
  return (
    <article className="blog-card">
      <Link to={`/blog/${post.slug}`} className="blog-art">{post.cover ? <img src={post.cover} alt="" /> : <><span>{post.tag}</span><b>{post.title.slice(0, 1)}</b></>}</Link>
      <div className="blog-meta"><span>{post.tag}</span><span>{post.date}</span></div>
      <h3><Link to={`/blog/${post.slug}`}>{post.title}</Link></h3>
      <p>{post.description}</p>
      <Link to={`/blog/${post.slug}`} className="card-arrow">Read post →</Link>
    </article>
  )
}
