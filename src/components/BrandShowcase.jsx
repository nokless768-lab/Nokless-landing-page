// The wall-sign mockup, shown plainly: the image is the brand moment.
export default function BrandShowcase() {
  return (
    <section className="section brand-section" id="brand">
      <div className="container brand-head">
        <h2>Redefining access &amp; security.</h2>
        <p>One platform for visitors, communication and access, from a single front door to every location you manage.</p>
      </div>
      <div className="container">
       <div className="brand-frame rv">
        <img
          className="brand-photo"
          src="/nokless-mockup.jpg"
          srcSet="/nokless-mockup-sm.jpg 900w, /nokless-mockup.jpg 1800w"
          sizes="(max-width: 900px) 100vw, 1180px"
          width="1800" height="1344"
          alt="Nokless logo and tagline “Redefining Access & Security” on an office wall"
          loading="lazy"
        />
       </div>
      </div>
    </section>
  )
}
