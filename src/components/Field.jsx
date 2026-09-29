export function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="block text-[13px] font-medium text-ink/80 mb-1.5">{label}</span>
      {children}
      {error && <span className="block text-xs text-danger mt-1.5">{error}</span>}
    </label>
  )
}

const baseInput =
  'w-full rounded-lg border bg-card px-3.5 py-2.5 text-[15px] text-ink placeholder:text-slate2/60 transition-colors focus:border-indigo focus:ring-1 focus:ring-indigo/40'

export function Input({ error, className = '', ...props }) {
  return (
    <input
      className={`${baseInput} ${error ? 'border-danger' : 'border-line'} ${className}`}
      {...props}
    />
  )
}

export function Select({ error, className = '', children, ...props }) {
  return (
    <select
      className={`${baseInput} ${error ? 'border-danger' : 'border-line'} ${className}`}
      {...props}
    >
      {children}
    </select>
  )
}
