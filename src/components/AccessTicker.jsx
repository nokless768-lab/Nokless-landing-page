const ENTRIES = [
  { name: 'Adaeze O.', gate: 'Lekki Gardens Estate · Gate 2', status: 'granted' },
  { name: 'Courier — GIG Logistics', gate: 'Ibile Hotel · Service entrance', status: 'granted' },
  { name: 'Tunde A.', gate: 'St. Iyabo Hospital · Staff wing', status: 'granted' },
  { name: 'Unregistered visitor', gate: 'Kaduna Heights · Main gate', status: 'denied' },
  { name: 'Chiamaka N.', gate: 'Nokless HQ · Front desk', status: 'granted' },
  { name: 'Maintenance crew', gate: 'Palm Court Estate · Gate 1', status: 'granted' },
]

function Row({ e }) {
  const ok = e.status === 'granted'
  return (
    <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-line bg-card shrink-0 min-w-[280px]">
      <span className={`w-2 h-2 rounded-full shrink-0 ${ok ? 'bg-success' : 'bg-danger'}`} />
      <div className="min-w-0">
        <p className="text-ink text-sm font-medium truncate">{e.name}</p>
        <p className="text-slate2 text-xs truncate">{e.gate}</p>
      </div>
      <span
        className={`ml-auto font-mono text-[10px] uppercase tracking-wide px-2 py-1 rounded-full shrink-0 ${
          ok ? 'text-success bg-success/10' : 'text-danger bg-danger/10'
        }`}
      >
        {e.status}
      </span>
    </div>
  )
}

// A soft, always-moving "recent access" ticker — makes the AI-verification
// pitch feel live rather than just claimed in a headline.
export default function AccessTicker() {
  const loop = [...ENTRIES, ...ENTRIES]
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <div className="flex gap-3 w-max animate-marquee hover:[animation-play-state:paused]">
        {loop.map((e, i) => (
          <Row e={e} key={i} />
        ))}
      </div>
    </div>
  )
}
