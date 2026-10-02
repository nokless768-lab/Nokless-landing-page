import Logo from './Logo.jsx'
import SmartLink from './SmartLink.jsx'
import { posts } from '../lib/posts.js'

const short = (t) => (t.length > 44 ? `${t.slice(0, 42).trim()}…` : t)

export default function SiteFooter() {
  return <footer className="site-footer"><div className="container footer-grid"><div><Logo /><p>Smarter Access. Safer Spaces.</p><span className="footer-location">Lagos, Nigeria · Built for everywhere</span></div><div className="footer-links"><div><span>Company</span><SmartLink href="/#about">About us</SmartLink><SmartLink href="/#why-nokless">Why Nokless</SmartLink><a href="mailto:hello@nokless.com">Contact</a><SmartLink href="/#download">Download</SmartLink></div><div><span>Solutions</span><SmartLink href="/#solutions">Homes</SmartLink><SmartLink href="/#solutions">Estates</SmartLink><SmartLink href="/#solutions">Hotels</SmartLink><SmartLink href="/#solutions">Hospitals</SmartLink></div><div><span>Resources</span><SmartLink href="/#faq">FAQ</SmartLink><SmartLink href="/blog">Blog</SmartLink><SmartLink href="/privacy">Privacy</SmartLink><SmartLink href="/terms">Terms</SmartLink></div><div><span>Latest articles</span>{posts.slice(0, 3).map((p) => <SmartLink href={`/blog/${p.slug}`} key={p.slug}>{short(p.title)}</SmartLink>)}<SmartLink href="/blog">All articles →</SmartLink></div></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Nokless Technologies Limited. All rights reserved.</span><span>Access, without the hardware.</span></div></footer>
}
