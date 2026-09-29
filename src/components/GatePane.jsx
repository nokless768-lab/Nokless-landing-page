import Logo from './Logo.jsx'
import PropertyShowcase from './PropertyShowcase.jsx'
import BlobField from './BlobField.jsx'

// The indigo half of the auth card — the "gate" that slides across when
// switching between sign in and register. `side` controls which inner
// corners get the big curved cut, which is what actually sells the
// slide (matches the curved blob edge from the reference video, just
// reskinned in brand indigo instead of purple).
export default function GatePane({ mode, side = 'right' }) {
  const radius =
    side === 'right'
      ? 'rounded-l-[64px] md:rounded-l-[88px]'
      : 'rounded-r-[64px] md:rounded-r-[88px]'

  return (
    <div
      className={`relative w-1/2 shrink-0 grow-0 basis-1/2 bg-gradient-to-br from-indigo to-indigo-deep grain-dots overflow-hidden flex flex-col justify-between p-8 md:p-10 transition-[border-radius] duration-700 ${radius}`}
    >
      {/* floating morphing blobs, clipped to the curved gate shape */}
      <BlobField variant="dark" opacity={0.5} />

      {/* scanning light sweep, a nod to a badge reader */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-sweep" />
      </div>

      <div className="relative z-10">
        <Logo on="dark" />
      </div>

      <div className="relative z-10 space-y-6">
        {mode === 'login' ? (
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 mb-2">
              Zone status &mdash; secured
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-white leading-tight">
              Every gate you manage,<br />one dashboard away.
            </h2>
          </div>
        ) : (
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 mb-2">
              New property &mdash; onboarding
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-white leading-tight">
              Built for the places<br />people need to get into.
            </h2>
          </div>
        )}
        <PropertyShowcase />
      </div>

      <p className="relative z-10 text-white/50 text-xs font-body max-w-[26ch]">
        Hardware-free visitor access, built for homes, estates, hotels, hospitals and businesses.
      </p>
    </div>
  )
}
