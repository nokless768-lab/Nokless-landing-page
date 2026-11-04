import { useEffect, useRef, useState } from 'react'

const queue = [
  { first: 'Tunde', who: 'Tunde Adeyemi', note: 'Delivery for Flat 4B', where: 'Main gate', time: '10:30' },
  { first: 'Chioma', who: 'Chioma Nwosu', note: 'Visiting Flat 12', where: 'Side gate', time: '10:34' },
  { first: 'Dr. Alade', who: 'Dr. Femi Alade', note: 'Meeting at Reception', where: 'Lobby', time: '10:41' },
  { first: 'Bisi', who: 'Bisi Lawal', note: 'Plumber for Flat 7', where: 'Main gate', time: '10:47' },
]
const earlier = [
  { id: 'e1', time: '09:48', who: 'Ngozi Eze', where: 'Reception', status: 'Checked out' },
  { id: 'e2', time: '09:12', who: 'Amaka Obi', where: 'Side gate', status: 'Checked in' },
  { id: 'e3', time: '08:40', who: 'Kunle Balogun', where: 'Main gate', status: 'Checked in' },
]
const ANSWER_AFTER = 3600 // the demo answers by itself until someone takes over
const NEXT_AFTER = 2200

// A small working example of the core job: a visitor arrives, the host
// answers from wherever they are, and the visit is recorded. It plays on its
// own, pauses when you hover it, and hands control over the moment you press
// a button.
export default function GateDemo() {
  const [idx, setIdx] = useState(0)
  const [answer, setAnswer] = useState(null) // null | 'Approved' | 'Declined'
  const [log, setLog] = useState(earlier)
  const [auto, setAuto] = useState(true)
  const [paused, setPaused] = useState(false)
  const counter = useRef(0)
  const req = queue[idx]

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) setAuto(false)
  }, [])

  function respond(result, manual) {
    if (manual) setAuto(false)
    setAnswer(result)
    counter.current += 1
    setLog((rows) => [{ id: `n${counter.current}`, time: req.time, who: req.who, where: req.where, status: result, fresh: true }, ...rows].slice(0, 4))
  }

  useEffect(() => {
    if (paused && auto) return undefined
    const t = answer === null
      ? (auto ? setTimeout(() => respond('Approved', false), ANSWER_AFTER) : null)
      : setTimeout(() => { setAnswer(null); setIdx((i) => (i + 1) % queue.length) }, NEXT_AFTER)
    return () => clearTimeout(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer, auto, paused, idx])

  return (
    <div className="gate-demo" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="gate-request" key={idx} aria-live={auto ? 'off' : 'polite'}>
        <p className="gate-meta"><span className={`live-dot ${answer ? 'is-still' : ''}`} aria-hidden="true" />{answer ? 'Answered' : 'New request'} · {req.where}, {req.time} AM</p>
        <h2 className="gate-name">{req.who}</h2>
        <p className="gate-note">{req.note}</p>
        {answer ? (
          <div className="gate-result">
            <p><strong className={answer === 'Approved' ? 'is-ok' : ''}>{answer}.</strong> The gate has been told to {answer === 'Approved' ? `let ${req.first} in` : `turn ${req.first} away`}.</p>
          </div>
        ) : (
          <div className="gate-actions">
            <button type="button" className="button button-primary" onClick={() => respond('Approved', true)}>Approve</button>
            <button type="button" className="button button-outline" onClick={() => respond('Declined', true)}>Decline</button>
            {auto && !paused && <span className="gate-timer" aria-hidden="true" />}
          </div>
        )}
        <p className={`gate-hint ${answer ? 'is-hidden' : ''}`}>{auto ? 'This plays on its own. Press a button to take over.' : 'Your call: approve or decline.'}</p>
      </div>
      <table className="gate-log">
        <caption>Today’s visits</caption>
        <tbody>
          {log.map((r) => (
            <tr key={r.id} className={r.fresh ? 'is-new' : ''}>
              <td>{r.time}</td>
              <td>{r.who}<span>{r.where}</span></td>
              <td className={r.status === 'Approved' ? 'is-ok' : ''}>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="demo-note">Sample data</p>
    </div>
  )
}
