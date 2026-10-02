import { Link } from 'react-router-dom'

// Internal paths ("/blog", "/#about") use client-side routing so they never
// hit the server and can't 404. mailto:/http links stay normal anchors.
export default function SmartLink({ href, children, ...rest }) {
  if (href.startsWith('/')) {
    const [path, hash] = href.split('#')
    return <Link to={{ pathname: path || '/', hash: hash ? `#${hash}` : '' }} {...rest}>{children}</Link>
  }
  return <a href={href} {...rest}>{children}</a>
}
