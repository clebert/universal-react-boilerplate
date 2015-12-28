import createDebug from 'debug'
import {format as formatUrl, parse as parseUrl} from 'url'

const debug = createDebug('clebert:pathname')

const normalize = p => p === '/' ? p : p.replace(/\/+/g, '/').replace(/\/$/, '')

export default () => async (ctx, next) => {
  const result = parseUrl(ctx.originalUrl)

  const {pathname: originalPathname} = result

  const pathname = normalize(originalPathname)

  if (pathname !== originalPathname) {
    const url = formatUrl({...result, pathname})

    ctx.status = 301

    debug(ctx.format(`${ctx.status} redirect to ${url}`))

    ctx.redirect(url)
  } else {
    await next()
  }
}
