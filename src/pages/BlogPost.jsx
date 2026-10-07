import { Link, Navigate, useParams } from 'react-router-dom'
import SiteNav from '../components/SiteNav.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import WaitlistCTA from '../components/WaitlistCTA.jsx'
import { PostCard } from './Blog.jsx'
import { posts } from '../lib/posts.js'
import { useSeo } from '../lib/seo.js'

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)
  useSeo(post ? { title: `${post.title} | Nokless`, description: post.description, jsonLd: { '@context': 'https://schema.org', '@type': 'Article', headline: post.title, description: post.description, datePublished: post.iso, author: { '@type': 'Organization', name: 'Nokless Technologies Limited' } } } : { title: 'Nokless Blog', description: 'The Nokless Blog' })
  if (!post) return <Navigate to="/blog" replace />
  const more = posts.filter((p) => p.slug !== slug).slice(0, 3)
  return (
    <>
      <SiteNav />
      <main>
        <article className="section article"><div className="container article-wrap">
          <Link to="/blog" className="text-link">← Back to the Blog</Link>
          <div className="blog-meta article-meta"><span>{post.tag}</span><span>{post.date} · {post.read}</span></div>
          <h1 className="page-title">{post.title}</h1>
          <p className="article-lede">{post.description}</p>
          {post.cover && <img className="post-cover" src={post.cover} alt="" />}
          {post.body.map((b, i) => b.type === 'img' ? <img className="post-img" key={i} src={b.src} alt="" /> : b.type === 'h' ? <h2 key={i}>{b.text}</h2> : <section key={i}><p>{b.text}</p></section>)}
          <WaitlistCTA />
        </div></article>
        {more.length > 0 && <section className="section blog-section"><div className="container"><h2 className="related-title">More from the Blog</h2><div className="blog-grid">{more.map((p) => <PostCard key={p.slug} post={p} />)}</div></div></section>}
      </main>
      <SiteFooter />
    </>
  )
}
