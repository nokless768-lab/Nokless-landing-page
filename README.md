# Nokless — Website (soft-launch scaffold)

React (Vite) + Tailwind. A landing page plus the registration and login
flow, built to satisfy the brief: capture the required fields, authenticate
with either email or phone, and redirect to `/dashboard` on success — with
enough of a real site around it to soft-launch and iterate on as more brand
detail comes in.

## Run it

```bash
npm install
npm run dev
```

- `/` — landing page (hero, how it works, property types, pricing, CTA)
- `/login`, `/register` — the sliding-gate auth flow
- `/dashboard` — placeholder that only renders once a session exists
  (redirects back to `/login` otherwise)

## Soft-launching now vs. waiting

Going live with this scaffold and iterating is the right call — nothing
here is a placeholder that needs ripping out later, it's real markup styled
to the brand direction, with clearly marked seams (mock auth, pricing
copy, dashboard) for whatever comes next. Two things worth locking down
before it's actually public, though:
1. **Real auth backend.** The mock in `src/lib/auth.jsx` is fine for a
   private soft launch but shouldn't hold real user passwords — swap it
   for Firebase Auth (already your stack) before anyone outside the team
   registers for real.
2. **Pricing numbers.** The pricing section deliberately has no figures —
   it names the two models from the brief (pay-as-you-go / subscription)
   without inventing rates. Drop in real numbers whenever they're locked.

## Design concept

Rebuilt on the official Nokless color system (Primary Indigo `#4F46E5`,
Deep Indigo `#3730A3`, Soft Lavender `#F5F3FF`, plus the semantic
success/warning/danger colors). Light-first now: white and lavender
backgrounds, indigo accents, `#1F2937` / `#6B7280` for text.

The "gate" concept still runs through it — the auth panel is framed as a
gate that physically slides from one side of the card to the other between
Sign in and Register, and the curved inner edge on that panel (see
`GatePane.jsx`) is a closer match to the blob-shaped slide in the reference
video than the first pass had, just reskinned in indigo. The property-type
badges (hotel/estate/hospital/company) use the glossy, gradient-filled
"cartoon render" style from the second video, and now pop in with a bouncy
scale rather than a plain fade — closer to how that icon generator's
results animated in.

Two additions beyond the original brief, meant to make the site feel less
like a template:
- **Stats band** under the hero (`<1s` verification, `0` hardware installs,
  `24/7` monitoring) — quick, concrete proof points instead of just claims.
- **Live access ticker** — a scrolling strip of recent (fake, for now)
  access events, so the "AI verifies every gate" pitch feels demonstrated
  rather than stated. Swap `ENTRIES` in `AccessTicker.jsx` for a real feed
  once there's an API to pull from.

Sections also fade/rise into view on scroll (`Reveal.jsx` /
`useReveal.js`) — plain `IntersectionObserver`, no extra dependency, and it
respects `prefers-reduced-motion`.

## Logo

`Logo.jsx` is a placeholder mark with a clear swap point — once the real
logo file comes through, drop it in `public/` and replace the `<svg>` in
that component with an `<img>` tag pointing at it. Every place the logo
appears (nav, footer, auth panels, dashboard) pulls from that one
component, so it updates everywhere at once.

## Animation system (v2)

First pass matched the reference clips structurally but stayed flat.
Second pass adds the actual visual language that was missing:

- **Floating morphing blobs** (`BlobField.jsx`) — blurred, gradient-filled
  shapes that drift and reshape their own border-radius on independent
  loops, so nothing feels synced/mechanical. Used behind the hero and
  inside the auth gate panel (clipped to its curved edge).
- **Glassmorphism** — the floating "access granted" hero card, the
  property-type badges, and the nav are all translucent + `backdrop-blur`
  over the blobs, rather than solid fills.
- **Floating navigation pill** — the nav is a fixed, centered, rounded
  glass pill instead of a full-width bar, with a spring entrance on load.
- **Mouse parallax** (`Parallax.jsx`) — the hero graphic drifts toward the
  cursor with spring physics (framer-motion), not a hard tilt.
- **Spring-based entrance animations** — `Reveal.jsx` now uses
  framer-motion's spring easing (slight overshoot) instead of a linear
  fade, and the "how it works" steps stagger in one after another.
- **Blob-morph icon pop** — the active property badge scales in with a
  spring + subtle rotation and floats in place, closer to the elastic
  "generated icon" motion in the reference clip, instead of a plain fade.

One real bug fixed along the way: a custom `.grain-dots` texture class and
Tailwind's `bg-gradient-to-br` were both setting `background-image` on the
same element, so the texture was silently overwriting the indigo gradient
entirely (that's what made the gate panel render white in the last
screenshots). Fixed by moving the texture onto a pseudo-element layer.
Also fixed the same class of bug in the nav: framer-motion's own inline
`transform` (for the y-spring) was overwriting the Tailwind
`-translate-x-1/2` centering class on the same element, which is why the
pill was rendering off-center. Split into a plain positioning wrapper +
an inner motion element so the two no longer fight over one CSS property.

## Mobile

Checked down to a 360px-wide viewport: nav collapses into a real hamburger
menu (was missing before — the old dark version just hid the links with
nothing to replace them), the stat band and pricing cards stack to a
single column, hero type steps down at each breakpoint, and the auth card
switches to the compact stacked layout under `md`.

## What's real vs. mocked

- **Real:** form validation, the required-fields list, phone-or-email login,
  redirect-on-success, responsive layout, keyboard focus states, reduced-motion support.
- **Mocked:** `src/lib/auth.jsx` fakes registration/login against
  `localStorage` so the flow works with zero backend. Swap `register()` and
  `login()` for real calls — Firebase Auth fits your existing stack
  (`createUserWithEmailAndPassword` / `signInWithEmailAndPassword`), or a
  Node/Express endpoint — without touching any component.
- **Assumption:** the brief listed Full name, Business/Estate name, Email,
  Phone, and State for registration, but didn't list a password field even
  though login requires one — I added a "Create a password" field to
  registration since an account needs one set somewhere. Flag if that
  should move elsewhere (e.g. an OTP-based passwordless flow instead).

## Structure

```
src/
  lib/auth.jsx        mock auth provider (swap for Firebase/API)
  lib/states.js        Nigerian states list for the State field
  components/
    SiteNav.jsx / SiteFooter.jsx
    GatePane.jsx        the indigo "gate" panel (curved slide edge + blobs)
    PropertyShowcase.jsx glass badges with spring pop-in
    BlobField.jsx         floating morphing gradient blobs
    Parallax.jsx           spring-based mouse-parallax wrapper
    AccessTicker.jsx     scrolling "recent access" strip
    Reveal.jsx            spring scroll-entrance wrapper (framer-motion)
    Logo.jsx              placeholder mark — swap point for the real logo
    Field.jsx              shared input/select/label
  pages/
    Home.jsx             landing page
    AuthLayout.jsx       the sliding-gate composition (desktop + mobile)
    Login.jsx
    Register.jsx
    ForgotPassword.jsx   stub — wire up a real reset flow
    Dashboard.jsx        placeholder landing spot post-auth
```
