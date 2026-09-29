import GatePane from '../components/GatePane.jsx'
import LoginForm from './Login.jsx'
import RegisterForm from './Register.jsx'
import Logo from '../components/Logo.jsx'
import PropertyShowcase from '../components/PropertyShowcase.jsx'

// Desktop/tablet: a single 200%-wide strip slides left/right so the indigo
// "gate" panel appears to swing from one side of the card to the other as
// the visitor moves between signing in and registering — the curved inner
// edge (set on GatePane) is what actually sells the slide.
//
// Mobile: the slide doesn't have room to breathe, so the gate collapses
// into a compact header above a full-width form instead.
export default function AuthLayout({ mode }) {
  return (
    <div className="min-h-screen w-full bg-appbg flex items-center justify-center px-4 py-8 md:py-14">
      <div className="w-full max-w-5xl">
        {/* Desktop / tablet: sliding gate card */}
        <div className="hidden md:block rounded-[2rem] overflow-hidden shadow-[0_30px_80px_-25px_rgba(79,70,229,0.35)] border border-line bg-card">
          <div
            className={`flex w-[200%] transition-transform duration-[750ms] ease-[cubic-bezier(.65,0,.35,1)] ${
              mode === 'login' ? 'translate-x-0' : '-translate-x-1/2'
            }`}
          >
            <div className="w-1/2 flex">
              <LoginForm />
              <GatePane mode="login" side="right" />
            </div>
            <div className="w-1/2 flex">
              <GatePane mode="register" side="left" />
              <RegisterForm />
            </div>
          </div>
        </div>

        {/* Mobile: compact stacked layout */}
        <div className="md:hidden rounded-3xl overflow-hidden shadow-[0_25px_60px_-20px_rgba(79,70,229,0.3)] border border-line">
          <div className="bg-gradient-to-br from-indigo to-indigo-deep grain-dots relative overflow-hidden px-6 pt-7 pb-6">
            <div className="relative z-10">
              <Logo on="dark" />
              <h2 className="font-display text-xl font-semibold text-white mt-5 mb-4 leading-snug">
                {mode === 'login'
                  ? 'Every gate you manage, one dashboard away.'
                  : 'Built for the places people need to get into.'}
              </h2>
              <PropertyShowcase />
            </div>
          </div>
          <div className="bg-card">
            {mode === 'login' ? <LoginForm full /> : <RegisterForm full />}
          </div>
        </div>
      </div>
    </div>
  )
}
