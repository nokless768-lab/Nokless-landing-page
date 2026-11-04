import SiteNav from '../components/SiteNav.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import SmartLink from '../components/SmartLink.jsx'
import { useSeo } from '../lib/seo.js'

export default function Legal({ kind }) {
  const title = kind === 'terms' ? 'Terms of Service' : 'Privacy Policy'
  useSeo({ title: `${title} | Nokless`, description: `${title} for Nokless Technologies Limited.` })
  return (
    <>
      <SiteNav />
      <main><section className="section"><div className="container article-wrap">
        <h1 className="page-title">{title}</h1>
        <p className="article-lede">Nokless Technologies Limited is finalizing this document ahead of launch. If you have questions in the meantime, please get in touch.</p>
        <a className="button button-primary" href="mailto:info@nokless.com">Contact us</a>{' '}
        <SmartLink href="/" className="text-link">Back to home</SmartLink>
      </div></section></main>
      <SiteFooter />
    </>
  )
}
