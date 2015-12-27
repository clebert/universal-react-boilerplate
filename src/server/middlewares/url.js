import createDebug from 'debug'
import formatMessage from '../utils/format-message'
import {format as formatUrl, parse as parseUrl} from 'url'

const debug = createDebug('clebert:url')

const normalize = p => p === '/' ? p : p.replace(/\/+/g, '/').replace(/\/$/, '')

export default () => {
  return async (ctx, next) => {
    const result = parseUrl(ctx.originalUrl)

    const {pathname: originalPathname} = result

    const pathname = normalize(originalPathname)

    if (pathname !== originalPathname) {
      const url = formatUrl({...result, pathname})

      ctx.status = 301

      debug(formatMessage(`${ctx.status} redirect to ${url}`, ctx))

      ctx.redirect(url)
    } else {
      await next()
    }
  }
}
