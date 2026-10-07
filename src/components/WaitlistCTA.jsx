import SmartLink from './SmartLink.jsx'

export default function WaitlistCTA({ topic }) {
  const subject = encodeURIComponent(`Nokless waitlist${topic ? ` - ${topic}` : ''}`)
  return (
    <div className="article-cta">
      <h3>Join the waitlist</h3>
      <p>Be first to know when Nokless is live. Join the waitlist or get the app as soon as it is available.</p>
      <div className="cta-row">
        <a className="button button-primary" href={`mailto:info@nokless.com?subject=${subject}`}>Join the waitlist</a>
        <SmartLink className="button button-outline" href="/#download">Download the app</SmartLink>
      </div>
    </div>
  )
}
