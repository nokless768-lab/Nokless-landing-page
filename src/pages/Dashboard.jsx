import { Navigate } from 'react-router-dom'
import { useAuth } from '../lib/auth.jsx'
import Logo from '../components/Logo.jsx'

// Placeholder landing spot after successful auth. Replace with the real
// dashboard build-out; this exists so the redirect-on-success requirement
// has somewhere real to send the user.
export default function Dashboard() {
  const { user, logout } = useAuth()

  if (!user) return <Navigate to="/login" replace />

  return (
    <div className="min-h-screen bg-appbg flex flex-col">
      <header className="flex items-center justify-between px-6 py-5 border-b border-line bg-card">
        <Logo />
        <button
          onClick={logout}
          className="text-sm text-slate2 hover:text-ink transition-colors font-medium"
        >
          Sign out
        </button>
      </header>
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 text-success text-xs font-mono uppercase tracking-wide px-3 py-1 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-blink" />
            Access granted
          </span>
          <h1 className="font-display text-3xl font-semibold text-ink mb-3">
            Welcome, {user.fullName.split(' ')[0]}.
          </h1>
          <p className="text-slate2 text-sm mb-1">
            {user.businessName} &middot; {user.state}
          </p>
          <p className="text-slate2/60 text-xs mt-6">
            This is a placeholder — the real dashboard build continues here.
          </p>
        </div>
      </main>
    </div>
  )
}
