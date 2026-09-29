import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Field, Input } from '../components/Field.jsx'
import Logo from '../components/Logo.jsx'

export default function ForgotPassword() {
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState('')

  function onSubmit(e) {
    e.preventDefault()
    setSent(true) // wire up to a real reset-email endpoint later
  }

  return (
    <div className="min-h-screen w-full bg-appbg flex items-center justify-center px-4 py-14">
      <div className="w-full max-w-sm bg-card rounded-3xl p-8 shadow-[0_25px_60px_-20px_rgba(79,70,229,0.25)] border border-line">
        <Logo className="mb-6" />
        {sent ? (
          <>
            <h1 className="font-display text-2xl font-semibold text-ink mb-2">Check your email</h1>
            <p className="text-slate2 text-sm mb-6">
              If an account exists for {email}, a reset link is on its way.
            </p>
          </>
        ) : (
          <>
            <h1 className="font-display text-2xl font-semibold text-ink mb-2">Reset your password</h1>
            <p className="text-slate2 text-sm mb-6">We'll send a reset link to your email.</p>
            <form onSubmit={onSubmit} className="space-y-4">
              <Field label="Email address">
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                />
              </Field>
              <button
                type="submit"
                className="w-full rounded-lg bg-indigo text-white font-medium py-3 text-sm tracking-wide hover:bg-indigo-deep transition-colors"
              >
                Send reset link
              </button>
            </form>
          </>
        )}
        <p className="text-sm text-slate2 text-center mt-8">
          <Link to="/login" className="text-ink font-medium hover:text-indigo transition-colors">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
