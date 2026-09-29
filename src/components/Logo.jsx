import { useState } from 'react'

export default function Logo({ className = '', on = 'light' }) {
  const [logoSrc, setLogoSrc] = useState('/nokless-monogram.jpg')

  return (
    <div className={`brand-lockup ${on === 'dark' ? 'brand-on-dark' : ''} ${className}`}>
      <img
        className="brand-monogram"
        src={logoSrc}
        alt=""
        aria-hidden="true"
        onError={() => setLogoSrc('/nokless-monogram.svg')}
      />
      <span className="logo-text">Nokless</span>
    </div>
  )
}
