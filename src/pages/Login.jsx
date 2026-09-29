import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Field, Input } from '../components/Field.jsx'
import { useAuth } from '../lib/auth.jsx'

export default function LoginForm({ full = false }) {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ identifier: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function update(key) {
    return (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={`${
        full ? 'w-full' : 'w-1/2 shrink-0 grow-0 basis-1/2'
      } bg-card flex flex-col justify-center px-8 py-10 md:px-12`}
    >
      <div className="max-w-sm w-full mx-auto">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-indigo-deep mb-2">
          Welcome back
        </p>
        <h1 className="font-display text-3xl font-semibold text-ink mb-1">Sign in</h1>
        <p className="text-slate2 text-sm mb-8">Access your Nokless dashboard.</p>

        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <Field label="Email or phone number">
            <Input
              type="text"
              autoComplete="username"
              placeholder="you@company.com or 0803..."
              value={form.identifier}
              onChange={update('identifier')}
              required
            />
          </Field>
          <Field label="Password">
            <Input
              type="password"
              autoComplete="current-password"
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
              value={form.password}
              onChange={update('password')}
              required
            />
          </Field>

          <div className="flex justify-end -mt-1">
            <Link to="/forgot-password" className="text-xs text-slate2 hover:text-ink transition-colors">
              Forgot your password?
            </Link>
          </div>

          {error && (
            <p role="alert" className="text-sm text-danger bg-danger/10 border border-danger/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-indigo text-white font-medium py-3 text-sm tracking-wide hover:bg-indigo-deep transition-colors disabled:opacity-60"
          >
            {loading ? 'Verifying…' : 'Sign in'}
          </button>
        </form>

        <p className="text-sm text-slate2 text-center mt-8">
          New to Nokless?{' '}
          <Link to="/register" className="text-ink font-medium hover:text-indigo-deep transition-colors">
            Register your property
          </Link>
        </p>
      </div>
    </div>
  )
}
