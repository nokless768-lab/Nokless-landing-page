import { useState } from 'react'
import { motion } from 'framer-motion'
import Logo from './Logo.jsx'
import SmartLink from './SmartLink.jsx'

const LINKS = [
  { href: '/#why-nokless', label: 'Why Nokless' },
  { href: '/#solutions', label: 'Solutions' },
  { href: '/#about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/#pricing', label: 'Pricing' },
]

export default function SiteNav() {
  const [open, setOpen] = useState(false)
  return <>
    <div className="nav-wrap">
      <motion.div initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 220, damping: 24 }}>
        <div className="site-nav">
          <SmartLink href="/" onClick={() => setOpen(false)} aria-label="Nokless home"><Logo /></SmartLink>
          <nav className="desktop-nav">{LINKS.map((link) => <SmartLink href={link.href} key={link.href}>{link.label}</SmartLink>)}</nav>
          <div className="nav-actions"><span className="auth-disabled" aria-disabled="true">Sign in</span><span className="auth-disabled" aria-disabled="true">Sign up</span><SmartLink className="nav-download" href="/#download">Get Started <span>↗</span></SmartLink></div>
          <button type="button" className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">{open ? '×' : '☰'}</button>
        </div>
        {open && <div className="mobile-menu">{LINKS.map((link) => <SmartLink href={link.href} onClick={() => setOpen(false)} key={link.href}>{link.label}</SmartLink>)}<span className="auth-disabled mobile-auth">Sign in / Sign up — coming later</span><SmartLink className="button button-primary" href="/#download" onClick={() => setOpen(false)}>Get Started <span>↗</span></SmartLink></div>}
      </motion.div>
    </div>
    <div id="top" className="nav-spacer" />
  </>
}
