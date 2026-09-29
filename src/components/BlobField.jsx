// Soft, blurred, slowly-morphing gradient blobs — the "floating 3D blob"
// language from the reference clip, done in CSS: no 3D engine, just layered
// radial gradients that drift (outer div) and reshape their border-radius
// (inner div) on independent loops so they never look like they're synced.
const PALETTES = {
  light: [
    { top: '-8%', left: '58%', size: 340, from: '#C7D2FE', to: '#4F46E5', dur: 19, floatDur: 11, delay: 0 },
    { top: '48%', left: '-10%', size: 280, from: '#A7F3D0', to: '#10B981', dur: 23, floatDur: 13, delay: 1.4 },
    { top: '68%', left: '68%', size: 220, from: '#FDE68A', to: '#F59E0B', dur: 17, floatDur: 9, delay: 2.6 },
  ],
  dark: [
    { top: '-12%', left: '-8%', size: 260, from: '#A5B4FC', to: '#4F46E5', dur: 18, floatDur: 10, delay: 0 },
    { top: '38%', left: '58%', size: 240, from: '#E0E7FF', to: '#3730A3', dur: 22, floatDur: 12, delay: 1.8 },
    { top: '72%', left: '10%', size: 190, from: '#818CF8', to: '#4F46E5', dur: 15, floatDur: 8, delay: 3.2 },
  ],
}

export default function BlobField({ variant = 'light', opacity = 0.55, className = '' }) {
  const blobs = PALETTES[variant] || PALETTES.light
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {blobs.map((b, i) => (
        <div
          key={i}
          className="absolute animate-floaty"
          style={{
            top: b.top,
            left: b.left,
            width: b.size,
            height: b.size,
            animationDuration: `${b.floatDur}s`,
            animationDelay: `${b.delay}s`,
          }}
        >
          <div
            className="w-full h-full animate-blobmorph"
            style={{
              background: `radial-gradient(circle at 35% 30%, ${b.from}, ${b.to})`,
              filter: 'blur(48px)',
              opacity,
              animationDuration: `${b.dur}s`,
              animationDelay: `${b.delay}s`,
            }}
          />
        </div>
      ))}
    </div>
  )
}
