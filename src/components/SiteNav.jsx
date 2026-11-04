import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Logo from './Logo.jsx'
import SmartLink from './SmartLink.jsx'

const LINKS = [
  { href: '/#why-nokless', label: 'Why Nokless' },
  { href: '/#solutions', label: 'Solutions' },
  { href: '/#about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/#pricing', label: 'Pricing' },
]
const SECTION_IDS = ['why-nokless', 'solutions', 'about', 'pricing']

export default function SiteNav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const { pathname } = useLocation()

  // One scroll handler drives: the condensed header, the reading-progress line,
  // the highlighted nav link, and the slow drift of the brand marks.
  useEffect(() => {
    const root = document.documentElement
    let frame = 0
    const update = () => {
      frame = 0
      const y = window.scrollY
      const max = root.scrollHeight - window.innerHeight
      setScrolled(y > 8)
      root.style.setProperty('--progress', max > 0 ? Math.min(y / max, 1).toFixed(4) : 0)
      if (pathname.startsWith('/blog')) setActive('/blog')
      else if (pathname === '/') {
        let current = ''
        for (const id of SECTION_IDS) { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= 160) current = `/#${id}` }
        setActive(current)
      } else setActive('')
      document.querySelectorAll('[data-parallax]').forEach((el) => {
        const r = el.parentElement.getBoundingClientRect()
        const offset = (r.top + r.height / 2 - window.innerHeight / 2) * Number(el.dataset.parallax)
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) rotate(${(offset * -0.12).toFixed(2)}deg)`
      })
    }
    const request = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    return () => { window.removeEventListener('scroll', request); window.removeEventListener('resize', request); cancelAnimationFrame(frame) }
  }, [pathname])

  return <>
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container site-nav">
        <SmartLink href="/" onClick={() => setOpen(false)} aria-label="Nokless home"><Logo /></SmartLink>
        <nav className="desktop-nav" aria-label="Main">{LINKS.map((link) => <SmartLink href={link.href} key={link.href} className={active === link.href ? 'is-active' : ''} aria-current={active === link.href ? 'true' : undefined}>{link.label}</SmartLink>)}</nav>
        <div className="nav-actions">
          <span className="auth-disabled" aria-disabled="true" title="Coming soon">Sign in</span>
          <span className="auth-disabled" aria-disabled="true" title="Coming soon">Sign up</span>
          <SmartLink className="button button-primary button-sm" href="/#download">Get started</SmartLink>
        </div>
        <button type="button" className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu">{open ? 'Close' : 'Menu'}</button>
      </div>
      {open && <div className="mobile-menu" id="mobile-menu"><div className="container">
        {LINKS.map((link) => <SmartLink href={link.href} onClick={() => setOpen(false)} key={link.href}>{link.label}</SmartLink>)}
        <span className="auth-disabled">Sign in and sign up are coming soon</span>
        <SmartLink className="button button-primary" href="/#download" onClick={() => setOpen(false)}>Get started</SmartLink>
      </div></div>}
    </header>
    <div id="top" />
  </>
}
