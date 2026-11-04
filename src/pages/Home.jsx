import { useState } from 'react'
import SiteNav from '../components/SiteNav.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import Logo from '../components/Logo.jsx'
import SmartLink from '../components/SmartLink.jsx'
import BrandShowcase from '../components/BrandShowcase.jsx'
import GateDemo from '../components/GateDemo.jsx'
import { useRevealAll } from '../lib/useSiteFx.js'

const why = [
  ['Hardware-free', 'Reduce dependence on traditional intercom and access hardware installations.'],
  ['Easy deployment', 'Introduce a digital access workflow without building a complicated physical infrastructure.'],
  ['Remote management', 'Manage visitor requests and property activity from wherever you are.'],
  ['Digital records', 'Keep organized visitor and check-in/check-out information.'],
  ['Scalable', 'Designed for individual properties and growing organizations with multiple locations.'],
  ['Controlled access', 'Give authorized users tools to manage access according to your operational process.'],
]

const solutions = [
  { name: 'Hotels', body: 'Create a more organized digital visitor and guest-access workflow.', points: ['Guest and visitor management', 'Digital check-in/check-out workflows', 'Visitor activity visibility', 'Multiple access points'] },
  { name: 'Estates', body: 'Give residential communities a digital layer for visitor management.', points: ['Resident visitor requests', 'Digital visitor records', 'Estate administration dashboard', 'Better gate communication workflows'] },
  { name: 'Hospitals', body: 'Support structured visitor management around sensitive facilities and departments.', points: ['Visitor identification workflows', 'Digital visitor records', 'Department or access-point management', 'Support for security teams'] },
  { name: 'Companies', body: 'Modernize workplace visitor management and reception workflows.', points: ['Client and visitor management', 'Host notifications', 'Organization dashboard', 'Digital visitor records'] },
]

const dashboardItems = ['Properties', 'Visitors', 'Users & permissions', 'Check-in/out', 'Activity', 'Reports']
const visitors = [
  ['Tunde Adeyemi', 'Flat 4B', 'Main gate', 'Approved'],
  ['Amaka Obi', 'Reception', 'Side gate', 'Checked in'],
  ['Kunle Balogun', 'Flat 12', 'Main gate', 'Checked in'],
  ['Ngozi Eze', 'Reception', 'Lobby', 'Checked out'],
]

const approach = ['Reduce unnecessary hardware', 'Simplify access', 'Make everyday interactions safer and more connected through software']
const ecosystem = ['Businesses', 'Property managers', 'Artisans', 'Technicians', 'Students', 'Small business owners']

const faqs = [
  ['What is Nokless?', 'Nokless is a hardware-free access management platform that helps homes, businesses, estates, hotels, hospitals and organizations manage visitors, communication and access through one digital platform.'],
  ['Do I need to install hardware?', 'No. Nokless is a software-first platform, so you can introduce a digital access workflow without a complicated physical installation.'],
  ['Who is Nokless for?', 'Individual properties and growing organizations with multiple locations, including homes, estates, hotels, hospitals and companies.'],
  ['How will pricing work?', 'The product is being shaped around two simple models: flexible usage-based access for lighter needs and a predictable subscription for teams or organizations with recurring volume. Final plan details will be announced soon.'],
]

export default function Home() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)
  useRevealAll()

  function handleNewsletter(event) {
    event.preventDefault()
    if (email.trim()) setSubscribed(true)
  }

  return (
    <div className="site-shell">
      <SiteNav />

      <main>
        <section className="hero">
          <img className="hero-mark" data-parallax="0.12" src="/nokless-mark.png" alt="" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <h1><span className="line"><span>Smarter Access.</span></span> <span className="line"><span>Safer Spaces.</span></span></h1>
              <p className="hero-lede">Nokless helps homes, businesses, estates, hotels, hospitals and organizations manage visitors, communication and access through one digital platform.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#download">Get started</a>
                <a className="text-link" href="#why-nokless">Why Nokless</a>
              </div>
            </div>
            <GateDemo />
          </div>
        </section>

        <section className="section" id="why-nokless">
          <div className="container split">
            <div className="split-head">
              <h2>Access management without unnecessary complexity.</h2>
              <p className="lede">Designed as a software-first platform for modern properties and organizations.</p>
            </div>
            <dl className="ruled">
              {why.map(([title, body], i) => <div className="ruled-row rv" style={{ '--d': `${i * 60}ms` }} key={title}><dt>{title}</dt><dd>{body}</dd></div>)}
            </dl>
          </div>
        </section>

        <section className="section band" id="solutions">
          <div className="container">
            <div className="section-head rv">
              <h2>Built for different spaces.</h2>
              <p className="lede">Use Nokless across residential, commercial and institutional environments.</p>
            </div>
            <div className="solutions">
              {solutions.map((item, i) => (
                <article className="solution-row rv" style={{ '--d': `${i * 70}ms` }} key={item.name}>
                  <h3>{item.name}</h3>
                  <div>
                    <p>{item.body}</p>
                    <ul className="plain-list">{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
                  </div>
                  <SmartLink className="text-link" href={`/solutions/${item.name.toLowerCase()}`} aria-label={`Nokless for ${item.name}`}>Nokless for {item.name}</SmartLink>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="dashboard">
          <div className="container">
            <div className="section-head rv">
              <h2>One dashboard. More visibility.</h2>
              <p className="lede">Give administrators a centralized place to manage properties, visitors, users, access points and activity.</p>
            </div>
            <div className="dash rv">
              <ul className="dash-nav" aria-label="Dashboard sections">
                {dashboardItems.map((item) => <li key={item} aria-current={item === 'Visitors' ? 'page' : undefined}>{item}</li>)}
              </ul>
              <div className="dash-main">
                <table>
                  <thead><tr><th scope="col">Visitor</th><th scope="col">Visiting</th><th scope="col">Access point</th><th scope="col">Status</th></tr></thead>
                  <tbody>{visitors.map(([who, host, point, status]) => <tr key={who}><td>{who}</td><td>{host}</td><td>{point}</td><td className={status === 'Approved' ? 'is-ok' : ''}>{status}</td></tr>)}</tbody>
                </table>
                <p className="demo-note">Sample data</p>
              </div>
            </div>
          </div>
        </section>

        <BrandShowcase />

        <section className="section" id="about">
          <div className="container about-grid">
            <div>
              <h2>Smarter, simpler, more accessible access.</h2>
              <div className="about-copy rv">
                <p><strong>Nokless Technologies Limited</strong> is a technology company building smarter, simpler, and more accessible ways for people and organizations to manage access and visitor interactions.</p>
                <p>We are developing a hardware-free access management platform designed for homes, businesses, estates, hotels, offices, and other environments where secure and convenient visitor management matters.</p>
                <p>Nokless is designed to help hosts and organizations manage visitors, communicate with guests, keep track of visits, and improve how access is handled—all through a convenient digital experience.</p>
              </div>
            </div>
            <div className="about-side">
              <section className="rv">
                <h3>Our approach</h3>
                <p>Our approach is simple:</p>
                <ol>{approach.map((a) => <li key={a}>{a}</li>)}</ol>
              </section>
              <section className="rv" style={{ '--d': '80ms' }}>
                <h3>Beyond access management</h3>
                <p>We are building a broader ecosystem that can support businesses, property managers, artisans, technicians, students, and small business owners through digital tools and services.</p>
              </section>
            </div>
          </div>
          <div className="container">
            <p className="vision rv">Our vision is to build technology that solves real-world problems without making people’s lives more complicated.</p>
          </div>
        </section>

        <section className="section band" id="pricing">
          <div className="container split">
            <div className="split-head">
              <h2>Simple by design. Flexible by need.</h2>
              <p className="lede">We are shaping Nokless around two clear ways to pay, so you can start light and scale when the work grows. Final plan details are being guided by our CTO and will be announced soon.</p>
            </div>
            <div className="plans">
              <article className="rv">
                <h3>Pay as you go</h3>
                <p>Use the access and visit tools you need, when you need them. A practical starting point for individuals and lighter usage.</p>
                <p className="plan-note">For occasional use. Usage-based, details coming soon.</p>
              </article>
              <article className="rv" style={{ '--d': '80ms' }}>
                <h3>Subscription</h3>
                <p>Predictable access management and investigation tools for businesses with recurring visits and more people to coordinate.</p>
                <p className="plan-note">For growing teams. Monthly, details coming soon.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="faq">
          <div className="container split">
            <div className="split-head">
              <h2>Good to know.</h2>
              <p className="lede">Still curious? Join the newsletter and we will keep you close to the launch.</p>
              <a href="#newsletter" className="button button-outline">Join the newsletter</a>
            </div>
            <div className="faq-list rv">
              {faqs.map(([question, answer], index) => (
                <div className={`faq-item ${openFaq === index ? 'is-open' : ''}`} key={question}>
                  <h3><button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index} aria-controls={`faq-${index}`}><span>{question}</span><span className="faq-plus" aria-hidden="true">+</span></button></h3>
                  {openFaq === index && <p id={`faq-${index}`}>{answer}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="download" id="download">
          <img className="download-mark" data-parallax="-0.09" src="/nokless-mark.png" alt="" aria-hidden="true" />
          <div className="container rv">
            <Logo on="dark" />
            <h2>Smarter access starts here.</h2>
            <p>Get started with Nokless and be first to experience hardware-free visitor and access management for your property or organization.</p>
            <a className="button button-light" href="mailto:info@nokless.com?subject=Nokless app access">Request app access</a>
          </div>
        </section>

        <section className="section newsletter" id="newsletter">
          <div className="container split">
            <h2>Useful updates. No noise.</h2>
            <div>
              {subscribed ? (
                <div className="success-message" role="status"><strong>You’re on the list.</strong><p>We’ll keep you posted on app access and organization features.</p></div>
              ) : (
                <form className="newsletter-form" onSubmit={handleNewsletter}>
                  <label htmlFor="email">Your email address</label>
                  <div>
                    <input id="email" type="email" required placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <button type="submit" className="button button-primary">Subscribe</button>
                  </div>
                  <small>By subscribing, you agree to receive occasional Nokless updates.</small>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
