import { Navigate, useParams } from 'react-router-dom'
import SiteNav from '../components/SiteNav.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import SmartLink from '../components/SmartLink.jsx'
import WaitlistCTA from '../components/WaitlistCTA.jsx'
import { solutions } from '../lib/solutions.js'
import { useSeo } from '../lib/seo.js'

export default function Solution() {
  const { slug } = useParams()
  const s = solutions.find((x) => x.slug === slug)
  useSeo(s ? { title: `${s.title} | Nokless`, description: s.description } : { title: 'Nokless', description: 'Nokless' })
  if (!s) return <Navigate to="/" replace />
  return (
    <>
      <SiteNav />
      <main><article className="section article"><div className="container article-wrap">
        <SmartLink href="/#solutions" className="text-link">All solutions</SmartLink>
        <h1 className="page-title">Nokless for {s.name}</h1>
        <p className="article-lede">{s.lede}</p>
        <ul className="solution-points">{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
        {s.sections.map(([h, t]) => <section key={h}><h2>{h}</h2><p>{t}</p></section>)}
        <WaitlistCTA topic={s.name} />
      </div></article></main>
      <SiteFooter />
    </>
  )
}
