import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Scroll to the #section after navigating, or to the top on a new page.
export default function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); return }
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
    return () => clearTimeout(t)
  }, [pathname, hash])
  return null
}
