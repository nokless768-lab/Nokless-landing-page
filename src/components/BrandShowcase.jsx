import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Reveal from './Reveal.jsx'

const chips = [
  ['Hardware-free', 'Software-first platform'],
  ['Remote management', 'From wherever you are'],
  ['Digital records', 'Every visit, organized'],
]

// The wall-sign mockup as a full-bleed brand moment: the photo slowly
// settles from a slight zoom as you scroll into it, with glass captions
// floating over the dark wall.
export default function BrandShowcase() {
  const frameRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.16, 1.04, 1])
  const shift = useTransform(scrollYProgress, [0, 1], ['3%', '-3%'])

  return (
    <section className="section brand-section" id="brand">
      <div className="container brand-head">
        <Reveal>
          <div className="eyebrow">The Nokless brand</div>
          <h2>Redefining access <span>&amp; security.</span></h2>
        </Reveal>
        <Reveal delay={0.1} as="p">One platform for visitors, communication and access, from a single front door to every location you manage.</Reveal>
      </div>

      <Reveal className="container brand-stage">
        <div className="brand-frame" ref={frameRef}>
          <motion.img
            src="/nokless-mockup.jpg"
            srcSet="/nokless-mockup-sm.jpg 900w, /nokless-mockup.jpg 1800w"
            sizes="(max-width: 900px) 100vw, 1180px"
            alt="Nokless logo and tagline “Redefining Access & Security” on an office wall"
            loading="lazy"
            style={{ scale, y: shift }}
          />
          <div className="brand-glow" aria-hidden="true" />
          <div className="brand-tag"><span className="tiny-label">NOKLESS / HQ</span><strong>Smarter Access. Safer Spaces.</strong></div>
        </div>
        <div className="brand-chips">
          {chips.map(([title, sub], i) => (
            <Reveal className="brand-chip" delay={0.1 * i} key={title}><span className="chip-dot" /><strong>{title}</strong><small>{sub}</small></Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
