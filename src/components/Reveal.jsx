import { motion } from 'framer-motion'

// Scroll entrance with actual spring physics instead of a linear ease —
// a little overshoot on the way in, which is what makes it feel "alive"
// rather than just a fade.
export default function Reveal({ as = 'div', className = '', children, delay = 0, ...props }) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18, delay }}
      className={className}
      {...props}
    >
      {children}
    </MotionTag>
  )
}
