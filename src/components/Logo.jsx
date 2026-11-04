// The mark is a transparent PNG; `on="dark"` turns it white for dark surfaces.
export default function Logo({ className = '', on = 'light' }) {
  return (
    <span className={`brand-lockup ${on === 'dark' ? 'brand-on-dark' : ''} ${className}`}>
      <img className="brand-mark" src="/nokless-mark.png" alt="" width="32" height="32" />
      <span className="logo-text">Nokless</span>
    </span>
  )
}
