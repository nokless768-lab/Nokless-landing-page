import { useState } from 'react'
import { motion } from 'framer-motion'
import Logo from './Logo.jsx'

const LINKS = [
  { href: '#why-nokless', label: 'Why Nokless' },
  { href: '#solutions', label: 'Solutions' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#blog', label: 'Journal' },
]

export default function SiteNav() {
  const [open, setOpen] = useState(false)
  return <>
    <div className="nav-wrap">
      <motion.div initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 220, damping: 24 }}>
        <div className="site-nav">
          <a href="#top" onClick={() => setOpen(false)} aria-label="Nokless home"><Logo /></a>
          <nav className="desktop-nav">{LINKS.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}</nav>
          <div className="nav-actions"><span className="auth-disabled" aria-disabled="true">Sign in</span><span className="auth-disabled" aria-disabled="true">Sign up</span><a className="nav-download" href="#download">Get Started <span>↗</span></a></div>
          <button type="button" className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">{open ? '×' : '☰'}</button>
        </div>
        {open && <div className="mobile-menu">{LINKS.map((link) => <a href={link.href} onClick={() => setOpen(false)} key={link.href}>{link.label}</a>)}<span className="auth-disabled mobile-auth">Sign in / Sign up — coming later</span><a className="button button-primary" href="#download" onClick={() => setOpen(false)}>Get Started <span>↗</span></a></div>}
      </motion.div>
    </div>
    <div id="top" className="nav-spacer" />
  </>
}
