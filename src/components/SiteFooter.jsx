import Logo from './Logo.jsx'

export default function SiteFooter() {
  return <footer className="site-footer"><div className="container footer-grid"><div><Logo /><p>Smarter Access. Safer Spaces.</p><span className="footer-location">Lagos, Nigeria · Built for everywhere</span></div><div className="footer-links"><div><span>Company</span><a href="/#about">About us</a><a href="/#why-nokless">Why Nokless</a><a href="mailto:hello@nokless.com">Contact</a><a href="/#download">Download</a></div><div><span>Solutions</span><a href="/#solutions">Homes</a><a href="/#solutions">Estates</a><a href="/#solutions">Hotels</a><a href="/#solutions">Hospitals</a></div><div><span>Resources</span><a href="/#faq">FAQ</a><a href="/#top">Privacy</a><a href="/#top">Terms</a><a href="/blog">Blog</a></div></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Nokless. All rights reserved.</span><span>Access, without the hardware.</span></div></footer>
}
