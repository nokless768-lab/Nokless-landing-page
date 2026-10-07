import { useState } from 'react'
import SiteNav from '../components/SiteNav.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import Logo from '../components/Logo.jsx'
import SmartLink from '../components/SmartLink.jsx'
import BrandShowcase from '../components/BrandShowcase.jsx'

const whyCards = [
  ['🔧', 'Hardware-free', 'Reduce dependence on traditional intercom and access hardware installations.'],
  ['⚡', 'Easy deployment', 'Introduce a digital access workflow without building a complicated physical infrastructure.'],
  ['🌍', 'Remote management', 'Manage visitor requests and property activity from wherever you are.'],
  ['📊', 'Digital records', 'Keep organized visitor and check-in/check-out information.'],
  ['📈', 'Scalable', 'Designed for individual properties and growing organizations with multiple locations.'],
  ['🔐', 'Controlled access', 'Give authorized users tools to manage access according to your operational process.'],
]

const solutions = [
  { icon: '🏨', name: 'Hotels', body: 'Create a more organized digital visitor and guest-access workflow.', points: ['Guest and visitor management', 'Digital check-in/check-out workflows', 'Visitor activity visibility', 'Multiple access points'] },
  { icon: '🏘️', name: 'Estates', body: 'Give residential communities a digital layer for visitor management.', points: ['Resident visitor requests', 'Digital visitor records', 'Estate administration dashboard', 'Better gate communication workflows'] },
  { icon: '🏥', name: 'Hospitals', body: 'Support structured visitor management around sensitive facilities and departments.', points: ['Visitor identification workflows', 'Digital visitor records', 'Department or access-point management', 'Support for security teams'] },
  { icon: '🏢', name: 'Companies', body: 'Modernize workplace visitor management and reception workflows.', points: ['Client and visitor management', 'Host notifications', 'Organization dashboard', 'Digital visitor records'] },
]

const dashboardItems = ['Properties', 'Visitors', 'Users & permissions', 'Check-in/out', 'Activity', 'Reports']

const faqs = [
  ['What is Nokless?', 'Nokless is a hardware-free access management platform that helps homes, businesses, estates, hotels, hospitals and organizations manage visitors, communication and access through one digital platform.'],
  ['Do I need to install hardware?', 'No. Nokless is a software-first platform, so you can introduce a digital access workflow without a complicated physical installation.'],
  ['Who is Nokless for?', 'Individual properties and growing organizations with multiple locations, including homes, estates, hotels, hospitals and companies.'],
  ['How will pricing work?', 'The product is being shaped around two simple models: flexible usage-based access for lighter needs and a predictable subscription for teams or organizations with recurring volume. Final plan details will be announced soon.'],
]

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

export default function Home() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)

  function handleNewsletter(event) {
    event.preventDefault()
    if (email.trim()) setSubscribed(true)
  }

  return (
    <div className="site-shell">
      <SiteNav />

      <main>
        <section className="hero-section">
          <div className="hero-orb orb-one" />
          <div className="hero-orb orb-two" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-dot" /> Hardware-free access management</div>
              <h1>Smarter Access. <em>Safer Spaces.</em></h1>
              <p className="hero-lede">Nokless helps homes, businesses, estates, hotels, hospitals and organizations manage visitors, communication and access through one digital platform.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#download">Get Started <Arrow /></a>
                <a className="text-link" href="#why-nokless">Why Nokless <Arrow /></a>
              </div>
              <div className="hero-proof"><span className="avatar-stack"><i>HM</i><i>ES</i><i>HS</i></span><span>Built for homes, estates, hotels, hospitals and companies.</span></div>
            </div>

            <div className="hero-visual" aria-label="Nokless visitor access preview">
              <div className="visual-label">NOKLESS / LIVE ACCESS</div>
              <div className="phone-frame">
                <div className="phone-top"><span>9:41</span><span>● ● ●</span></div>
                <div className="phone-greeting">Good morning, <strong>Ola</strong> <span>✦</span></div>
                <div className="phone-card phone-card-primary"><div><span className="tiny-label">VISITOR REQUEST</span><h3>Guest at the gate</h3><p>Main entrance · 10:30 AM</p></div><span className="status-pill">Approved</span></div>
                <div className="map-preview"><span className="map-line line-a" /><span className="map-line line-b" /><span className="map-pin">✦</span><span className="map-home">⌂</span></div>
                <div className="phone-card incident-card"><span className="incident-icon">✓</span><div><span className="tiny-label">DIGITAL RECORDS</span><h3>Check-in logged</h3><p>Every visit, kept organized.</p></div><Arrow /></div>
                <div className="phone-nav"><span>⌂<small>Home</small></span><span className="active">◉<small>Visitors</small></span><span>◌<small>Profile</small></span></div>
              </div>
              <div className="float-note note-top"><span className="note-icon">✓</span><span><strong>Access approved</strong><small>Remote management</small></span></div>
              <div className="float-note note-bottom"><span className="note-icon note-purple">↗</span><span><strong>Visit recorded</strong><small>2 minutes ago</small></span></div>
            </div>
          </div>
          <div className="container hero-bottom"><span>Software-first access management</span><span className="hero-rule" /><span>Built for Nigeria, ready for everywhere</span></div>
        </section>

        <section className="section intro-section" id="why-nokless">
          <div className="container two-col-intro"><div><div className="eyebrow">Why Nokless</div><h2>Access management <span>without unnecessary complexity.</span></h2></div><p className="section-lede">Designed as a software-first platform for modern properties and organizations.</p></div>
          <div className="container why-grid">{whyCards.map(([icon, title, body]) => <article className="why-card" key={title}><span className="why-icon" aria-hidden="true">{icon}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
        </section>

        <section className="section audience-section" id="solutions"><div className="container section-heading-row"><div><div className="eyebrow">Solutions</div><h2>Built for different spaces. Designed for better access management.</h2></div><p>Use Nokless across residential, commercial and institutional environments.</p></div><div className="container solutions-grid">{solutions.map((item) => <article className="solution-card" key={item.name}><span className="solution-icon" aria-hidden="true">{item.icon}</span><h3>{item.name}</h3><p>{item.body}</p><ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul><SmartLink className="button button-outline read-more" href={`/solutions/${item.name.toLowerCase()}`}>Read more <Arrow /></SmartLink></article>)}</div></section>

        <section className="section incident-section" id="dashboard"><div className="container section-heading-row"><div><div className="eyebrow">Organization dashboard</div><h2>One dashboard. More visibility.</h2></div><p>Give administrators a centralized place to manage properties, visitors, users, access points and activity.</p></div><div className="container dash-grid">{dashboardItems.map((item) => <div className="dash-item" key={item}><span aria-hidden="true">✓</span>{item}</div>)}</div></section>

        <BrandShowcase />

        <section className="section about-section" id="about"><div className="container about-grid"><div><div className="eyebrow">About us</div><h2>Smarter, simpler, more accessible access.</h2><div className="about-copy"><p><strong>Nokless Technologies Limited</strong> is a technology company building smarter, simpler, and more accessible ways for people and organizations to manage access and visitor interactions.</p><p>We are developing a hardware-free access management platform designed for homes, businesses, estates, hotels, offices, and other environments where secure and convenient visitor management matters.</p><p>Nokless is designed to help hosts and organizations manage visitors, communicate with guests, keep track of visits, and improve how access is handled—all through a convenient digital experience.</p></div></div><div className="about-side"><div className="about-approach"><span className="tiny-label">OUR APPROACH</span><p>Our approach is simple:</p><ol><li>Reduce unnecessary hardware</li><li>Simplify access</li><li>Make everyday interactions safer and more connected through software</li></ol></div><div className="about-eco"><span className="tiny-label">BEYOND ACCESS MANAGEMENT</span><p>We are building a broader ecosystem that can support businesses, property managers, artisans, technicians, students, and small business owners through digital tools and services.</p><div className="about-tags">{['Businesses', 'Property managers', 'Artisans', 'Technicians', 'Students', 'Small business owners'].map((t) => <span key={t}>{t}</span>)}</div></div></div></div><div className="container"><blockquote className="about-vision"><span className="tiny-label">OUR VISION</span>Our vision is to build technology that solves real-world problems without making people's lives more complicated.</blockquote></div></section>

        <section className="section pricing-section" id="pricing"><div className="container pricing-wrap"><div><div className="eyebrow">A plan that can grow with you</div><h2>Simple by design.<br /><span>Flexible by need.</span></h2><p>We are shaping Nokless around two clear ways to pay, so you can start light and scale when the work grows. Final plan details are being guided by our CTO and will be announced soon.</p></div><div className="pricing-cards"><div className="pricing-card"><span className="pricing-tag">For occasional use</span><h3>Pay as you go</h3><p>Use the access and visit tools you need, when you need them. A practical starting point for individuals and lighter usage.</p><span className="pricing-note">Usage-based · Details coming soon</span></div><div className="pricing-card pricing-card-accent"><span className="pricing-tag">For growing teams</span><h3>Subscription</h3><p>Predictable access management and investigation tools for businesses with recurring visits and more people to coordinate.</p><span className="pricing-note">Monthly · Details coming soon</span></div></div></div></section>


        <section className="section testimonial-section" id="testimonials"><div className="container testimonial-head"><div className="eyebrow">Testimonials</div><h2>What early users are saying.</h2></div><div className="container testimonial-card"><div className="quote-mark">“</div><blockquote>“Nokless has made our visitor management process much easier to organize.”</blockquote><div className="quote-author"><span className="author-avatar">EU</span><span><strong>Early User</strong><small>Beta Tester</small></span></div></div></section>

        <section className="section faq-section" id="faq"><div className="container faq-grid"><div><div className="eyebrow">Questions, answered</div><h2>Good to know.</h2><p>Still curious? Join the newsletter and we will keep you close to the launch.</p><a href="#newsletter" className="button button-outline">Join the newsletter <Arrow /></a></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? 'is-open' : ''}`} key={question}><button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}><span>{question}</span><span className="faq-plus">+</span></button>{openFaq === index && <p>{answer}</p>}</div>)}</div></div></section>

        <section className="download-section" id="download"><div className="container download-grid"><div><Logo on="dark" /><h2>Smarter access starts here.</h2><p>Get started with Nokless and be first to experience hardware-free visitor and access management for your property or organization.</p><a className="button button-light" href="mailto:info@nokless.com?subject=Nokless app access">Request app access <Arrow /></a></div><div className="download-code"><div className="qr-placeholder"><span>NO</span></div><div><span className="tiny-label">APP ACCESS</span><p>Scan when the app is live or join the waitlist to get notified.</p></div></div></div></section>

        <section className="newsletter-section" id="newsletter"><div className="container newsletter-card"><div><div className="eyebrow">Stay in the loop</div><h2>Useful updates.<br /><span>No noise.</span></h2></div><div>{subscribed ? <div className="success-message"><strong>You’re on the list.</strong><p>We’ll keep you posted on app access and organization features.</p></div> : <form className="newsletter-form" onSubmit={handleNewsletter}><label htmlFor="email">Your email address</label><div><input id="email" type="email" required placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} /><button type="submit" className="button button-primary">Subscribe <Arrow /></button></div><small>By subscribing, you agree to receive occasional Nokless updates.</small></form>}</div></div></section>
      </main>
      <SiteFooter />
    </div>
  )
}
