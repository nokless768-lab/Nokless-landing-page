import Logo from './Logo.jsx'
import { contact } from '../lib/contact.js'
import SmartLink from './SmartLink.jsx'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo on="dark" />
          <p>Smarter Access. Safer Spaces.</p>
          <ul className="footer-contact">
            <li>{contact.address}</li>
            <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
            {contact.phone && <li><a href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`}>{contact.phone}</a></li>}
          </ul>
        </div>
        <nav className="footer-links" aria-label="Footer">
          <div><h2>Company</h2><SmartLink href="/#about">About us</SmartLink><SmartLink href="/#why-nokless">Why Nokless</SmartLink><a href={`mailto:${contact.email}`}>Contact</a><SmartLink href="/#download">Get the app</SmartLink></div>
          <div><h2>Solutions</h2><SmartLink href="/#solutions">Homes</SmartLink><SmartLink href="/solutions/estates">Estates</SmartLink><SmartLink href="/solutions/hotels">Hotels</SmartLink><SmartLink href="/solutions/hospitals">Hospitals</SmartLink><SmartLink href="/solutions/companies">Companies</SmartLink></div>
          <div><h2>Resources</h2><SmartLink href="/#faq">FAQ</SmartLink><SmartLink href="/blog">Blog</SmartLink><SmartLink href="/privacy">Privacy</SmartLink><SmartLink href="/terms">Terms</SmartLink></div>
        </nav>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} Nokless Technologies Limited. All rights reserved.</span><span>Access, without the hardware.</span></div>
    </footer>
  )
}
