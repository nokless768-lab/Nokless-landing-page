import { useEffect, useRef, useState } from 'react'
import SiteNav from '../components/SiteNav.jsx'
import SiteFooter from '../components/SiteFooter.jsx'

// Shrink a picked image so post files stay small.
function shrink(file, max = 1400) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const k = Math.min(1, max / Math.max(img.width, img.height))
      const c = document.createElement('canvas')
      c.width = Math.round(img.width * k); c.height = Math.round(img.height * k)
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height)
      resolve(c.toDataURL('image/jpeg', 0.82))
    }
    img.src = URL.createObjectURL(file)
  })
}

export default function NewPost() {
  const [f, setF] = useState({ title: '', tag: 'News', description: '', body: '' })
  const [cover, setCover] = useState('')
  const [imgs, setImgs] = useState([])
  const ta = useRef(null)
  useEffect(() => {
    document.title = 'New blog post | Nokless'
    const m = document.createElement('meta'); m.name = 'robots'; m.content = 'noindex'; document.head.appendChild(m)
    return () => m.remove()
  }, [])
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const addImgs = async (e) => { const out = []; for (const file of e.target.files) out.push(await shrink(file)); setImgs([...imgs, ...out]); e.target.value = '' }
  const addCover = async (e) => { if (e.target.files[0]) setCover(await shrink(e.target.files[0])); e.target.value = '' }
  const insert = (n) => {
    const t = ta.current, pos = t.selectionStart, token = `\n\n[image ${n}]\n\n`
    setF({ ...f, body: f.body.slice(0, pos) + token + f.body.slice(pos) })
  }
  const ready = f.title.trim() && f.description.trim() && f.body.trim()
  function download() {
    const body = f.body.split(/\n{2,}/).map((t) => t.trim()).filter(Boolean).map((t) => {
      const m = t.match(/^\[image (\d+)\]$/)
      if (m && imgs[m[1] - 1]) return { type: 'img', src: imgs[m[1] - 1] }
      return t.startsWith('## ') ? { type: 'h', text: t.slice(3) } : { type: 'p', text: t }
    })
    const now = new Date(), iso = now.toISOString().slice(0, 10)
    const slug = f.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    const words = f.body.trim().split(/\s+/).length
    const post = { slug, tag: f.tag || 'News', iso, date: now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }), read: `${Math.max(1, Math.round(words / 200))} min read`, title: f.title.trim(), description: f.description.trim(), cover, body }
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([JSON.stringify(post, null, 2)], { type: 'application/json' }))
    a.download = `${iso}-${slug}.json`; a.click()
  }
  return (
    <>
      <SiteNav />
      <main><section className="section"><div className="container article-wrap composer">
        <div className="eyebrow">Blog</div>
        <h1 className="page-title">New post</h1>
        <label>Title<input value={f.title} onChange={set('title')} /></label>
        <label>Category<input value={f.tag} onChange={set('tag')} /></label>
        <label>Short summary<textarea rows={2} value={f.description} onChange={set('description')} /></label>
        <div className="upload-box"><strong>Cover picture</strong>{cover && <img src={cover} alt="" />}<input type="file" accept="image/*" onChange={addCover} /></div>
        <label>Post text<small>Separate paragraphs with a blank line. Start a line with ## for a heading.</small><textarea ref={ta} rows={12} value={f.body} onChange={set('body')} /></label>
        <div className="upload-box"><strong>Pictures inside the post</strong><input type="file" accept="image/*" multiple onChange={addImgs} />
          <div className="thumbs">{imgs.map((src, i) => <figure key={i}><img src={src} alt="" /><button type="button" onClick={() => insert(i + 1)}>Insert picture {i + 1} here</button></figure>)}</div></div>
        <button className="button button-primary" disabled={!ready} onClick={download}>Download post file</button>
        <p className="composer-help">To publish: put the downloaded file in <code>src/content/blog/</code>, then rebuild and upload the site.</p>
      </div></section></main>
      <SiteFooter />
    </>
  )
}
