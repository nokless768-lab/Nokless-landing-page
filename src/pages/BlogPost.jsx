import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import SiteNav from '../components/SiteNav.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import SmartLink from '../components/SmartLink.jsx'
import { PostCard } from './Blog.jsx'
import { posts } from '../lib/posts.js'
import { useSeo } from '../lib/seo.js'

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)
  useEffect(() => { window.scrollTo(0, 0) }, [slug])
  useSeo(post ? {
    title: `${post.title} | Nokless`,
    description: post.description,
    jsonLd: { '@context': 'https://schema.org', '@type': 'Article', headline: post.title, description: post.description, datePublished: post.iso, author: { '@type': 'Organization', name: 'Nokless Technologies Limited' }, publisher: { '@type': 'Organization', name: 'Nokless Technologies Limited' } },
  } : { title: 'Nokless Journal', description: 'Nokless journal' })
  if (!post) return <Navigate to="/blog" replace />
  const more = posts.filter((p) => p.slug !== slug).slice(0, 3)
  return (
    <>
      <SiteNav />
      <main>
        <article className="section article">
          <div className="container article-wrap">
            <Link to="/blog" className="text-link">← All articles</Link>
            <div className="blog-meta article-meta"><span>{post.tag}</span><span>{post.date} · {post.read}</span></div>
            <h1 className="page-title">{post.title}</h1>
            <p className="article-lede">{post.description}</p>
            {post.body.map(([h, t]) => <section key={h}><h2>{h}</h2><p>{t}</p></section>)}
            <div className="article-cta"><h3>Ready for smarter access?</h3><p>Nokless helps homes, estates, hotels, hospitals and companies manage visitors and access through one digital platform.</p><SmartLink className="button button-primary" href="/#download">Get Started</SmartLink></div>
          </div>
        </article>
        <section className="section blog-section"><div className="container"><h2 className="related-title">Keep reading</h2><div className="blog-grid">{more.map((p) => <PostCard key={p.slug} post={p} />)}</div></div></section>
      </main>
      <SiteFooter />
    </>
  )
}
