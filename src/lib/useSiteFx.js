import { useEffect } from 'react'

// Elements marked .rv fade and rise into place once, as they scroll into view.
// The hidden starting state only applies after this hook has run, so nothing
// stays invisible if JavaScript or IntersectionObserver is unavailable.
export function useRevealAll() {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const root = document.documentElement
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
    }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })
    root.classList.add('rv-on')
    document.querySelectorAll('.rv').forEach((el) => io.observe(el))
    return () => { io.disconnect(); root.classList.remove('rv-on') }
  }, [])
}
