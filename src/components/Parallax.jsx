import { motion, useMotionValue, useSpring } from 'framer-motion'

// Wrap anything in this and it'll drift toward the cursor with spring
// physics — subtle, not a full tilt/rotate gimmick. Pass a negative
// strength to make a layer drift the *opposite* way (useful for background
// blobs, so foreground and background separate visually as the mouse moves).
export default function Parallax({ children, strength = 16, className = '' }) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 150, damping: 20, mass: 0.6 })
  const sy = useSpring(my, { stiffness: 150, damping: 20, mass: 0.6 })

  function handleMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    const relX = (e.clientX - rect.left) / rect.width - 0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5
    mx.set(relX * strength)
    my.set(relY * strength)
  }
  function handleLeave() {
    mx.set(0)
    my.set(0)
  }

  return (
    <div className={className} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <motion.div style={{ x: sx, y: sy }}>{children}</motion.div>
    </div>
  )
}
