import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Glossy, rounded "cartoon" renders in the style the brief asked for —
// chunky blob shapes, soft gradient fills, a highlight ellipse for shine —
// one warm accent colour per property type so the grid reads instantly.
const PROPERTIES = [
  {
    id: 'hotel',
    label: 'Hotels',
    grad: ['#FFC672', '#F2933D'],
    icon: (
      <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="15" width="24" height="18" rx="3" fill="#fff" fillOpacity="0.92" />
        <path d="M8 17a12 9 0 0 1 24 0v3H8z" fill="#fff" fillOpacity="0.7" />
        <rect x="13" y="21" width="5" height="5" rx="1.4" fill="#F2933D" fillOpacity="0.55" />
        <rect x="22" y="21" width="5" height="5" rx="1.4" fill="#F2933D" fillOpacity="0.55" />
        <path d="M17 33v-5a3 3 0 0 1 6 0v5" fill="none" stroke="#F2933D" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="15" cy="19.5" rx="6" ry="2" fill="#fff" fillOpacity="0.5" />
      </svg>
    ),
  },
  {
    id: 'estate',
    label: 'Estates',
    grad: ['#8FE3C4', '#39B592'],
    icon: (
      <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 34V19L20 10l11 9v15z" fill="#fff" fillOpacity="0.92" />
        <path d="M9 19 20 10l11 9-2.5 2L20 14l-8.5 7z" fill="#fff" fillOpacity="0.6" />
        <rect x="13" y="24" width="6" height="10" rx="1" fill="#39B592" fillOpacity="0.55" />
        <rect x="22" y="23" width="6" height="6" rx="1" fill="#39B592" fillOpacity="0.55" />
        <ellipse cx="16" cy="15" rx="5" ry="1.6" fill="#fff" fillOpacity="0.5" />
      </svg>
    ),
  },
  {
    id: 'hospital',
    label: 'Hospitals',
    grad: ['#FF9FA8', '#EB5B6C'],
    icon: (
      <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <rect x="7" y="7" width="26" height="26" rx="7" fill="#fff" fillOpacity="0.92" />
        <path d="M20 13v14M13 20h14" stroke="#EB5B6C" strokeWidth="3.2" strokeLinecap="round" />
        <ellipse cx="14" cy="13" rx="5" ry="2" fill="#fff" fillOpacity="0.5" />
      </svg>
    ),
  },
  {
    id: 'company',
    label: 'Companies',
    grad: ['#9FB8FF', '#5A78E6'],
    icon: (
      <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <rect x="11" y="5" width="18" height="29" rx="2.5" fill="#fff" fillOpacity="0.92" />
        <rect x="15" y="10" width="3" height="3" rx="0.8" fill="#5A78E6" fillOpacity="0.6" />
        <rect x="22" y="10" width="3" height="3" rx="0.8" fill="#5A78E6" fillOpacity="0.6" />
        <rect x="15" y="16" width="3" height="3" rx="0.8" fill="#5A78E6" fillOpacity="0.6" />
        <rect x="22" y="16" width="3" height="3" rx="0.8" fill="#5A78E6" fillOpacity="0.6" />
        <rect x="16.5" y="26" width="7" height="8" rx="1.2" fill="#5A78E6" fillOpacity="0.55" />
        <ellipse cx="15" cy="8" rx="4.5" ry="1.5" fill="#fff" fillOpacity="0.5" />
      </svg>
    ),
  },
]

// A rotating "badge scanner" — reads out the property types Nokless secures,
// one at a time, echoing an access-control terminal cycling through zones.
// Cards are glassy (backdrop-blur + translucent fill) and the active icon
// pops in with a spring rather than a plain fade, and floats gently in
// place — closer to the elastic, floating-blob feel of the reference clip.
export default function PropertyShowcase() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % PROPERTIES.length), 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="grid grid-cols-2 gap-3">
      {PROPERTIES.map((p, i) => {
        const isActive = i === active
        return (
          <motion.div
            key={p.id}
            animate={{ scale: isActive ? 1.03 : 1, y: isActive ? -2 : 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className={`relative rounded-2xl border px-4 py-4 flex flex-col items-start gap-3 backdrop-blur-md transition-colors duration-500 ${
              isActive
                ? 'border-white/40 bg-white/[0.14] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)]'
                : 'border-white/15 bg-white/[0.05]'
            }`}
          >
            <AnimatePresence mode="wait">
              {isActive ? (
                <motion.div
                  key={`${p.id}-active`}
                  initial={{ scale: 0.6, rotate: -8, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1, y: [0, -3, 0] }}
                  transition={{
                    scale: { type: 'spring', stiffness: 300, damping: 14 },
                    rotate: { type: 'spring', stiffness: 300, damping: 14 },
                    y: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center shadow-[0_6px_16px_-4px_rgba(0,0,0,0.45)]"
                  style={{ background: `linear-gradient(140deg, ${p.grad[0]}, ${p.grad[1]})` }}
                >
                  <div className="w-7 h-7">{p.icon}</div>
                </motion.div>
              ) : (
                <div
                  key={p.id}
                  className="w-10 h-10 rounded-xl flex items-center justify-center opacity-60 grayscale"
                  style={{ background: `linear-gradient(140deg, ${p.grad[0]}, ${p.grad[1]})` }}
                >
                  <div className="w-7 h-7">{p.icon}</div>
                </div>
              )}
            </AnimatePresence>
            <span
              className={`font-mono text-[11px] tracking-wide uppercase transition-colors duration-500 ${
                isActive ? 'text-white' : 'text-white/50'
              }`}
            >
              {p.label}
            </span>
            {isActive && (
              <span className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-success animate-blink" />
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
