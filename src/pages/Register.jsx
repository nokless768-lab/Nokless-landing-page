import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Field, Input, Select } from '../components/Field.jsx'
import { useAuth } from '../lib/auth.jsx'
import { NIGERIAN_STATES } from '../lib/states.js'

const initial = {
  fullName: '',
  businessName: '',
  email: '',
  phone: '',
  state: '',
  password: '',
}

export default function RegisterForm({ full = false }) {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState(initial)
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
      await register(form)
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
          Get set up
        </p>
        <h1 className="font-display text-3xl font-semibold text-ink mb-1">Register</h1>
        <p className="text-slate2 text-sm mb-8">Set up access for your property in a few minutes.</p>

        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <Field label="Full name">
            <Input
              type="text"
              autoComplete="name"
              placeholder="Ada Obi"
              value={form.fullName}
              onChange={update('fullName')}
              required
            />
          </Field>
          <Field label="Business / estate name">
            <Input
              type="text"
              placeholder="e.g. Lekki Gardens Estate"
              value={form.businessName}
              onChange={update('businessName')}
              required
            />
          </Field>
          <Field label="Email address">
            <Input
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={update('email')}
              required
            />
          </Field>
          <Field label="Phone number">
            <Input
              type="tel"
              autoComplete="tel"
              placeholder="0803 000 0000"
              value={form.phone}
              onChange={update('phone')}
              required
            />
          </Field>
          <Field label="State">
            <Select value={form.state} onChange={update('state')} required>
              <option value="" disabled>
                Select your state
              </option>
              {NIGERIAN_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Password">
            <Input
              type="password"
              autoComplete="new-password"
              placeholder="Create a password"
              value={form.password}
              onChange={update('password')}
              minLength={8}
              required
            />
          </Field>

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
            {loading ? 'Setting up…' : 'Register'}
          </button>
        </form>

        <p className="text-sm text-slate2 text-center mt-8">
          Already on Nokless?{' '}
          <Link to="/login" className="text-ink font-medium hover:text-indigo-deep transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
