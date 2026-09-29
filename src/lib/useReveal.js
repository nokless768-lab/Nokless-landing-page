import { useEffect, useRef, useState } from 'react'

// Lightweight scroll-reveal: returns a ref to attach and a boolean that
// flips true once the element enters the viewport. No extra dependency —
// just IntersectionObserver, and it's a no-op if that API is unavailable.
export function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setRevealed(true)
      return
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          obs.disconnect()
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return [ref, revealed]
}
