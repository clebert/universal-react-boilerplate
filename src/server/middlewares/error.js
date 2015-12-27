import createDebug from 'debug'
import formatMessage from '../utils/format-message'
import {parse as parseUrl} from 'url'

const debug = createDebug('clebert:error')

const redirectToErrorPage = ctx => {
  const url = '/oops'

  ctx.status = 302

  debug(formatMessage(`${ctx.status} redirect to ${url}`, ctx))

  ctx.redirect(url)
}

const handleBadRequest = ctx => {
  const {message, originalUrl} = ctx
  const {pathname} = parseUrl(originalUrl)

  if (/^\/assets\//.test(pathname) || /^\/api\//.test(pathname) || /^\/oops\/?$/.test(pathname)) {
    ctx.body = {error: message}
  } else {
    redirectToErrorPage(ctx)
  }
}

export default () => {
  return async (ctx, next) => {
    try {
      await next()

      const {status} = ctx

      if (status >= 400) {
        debug(formatMessage(`handle status code ${status}`, ctx))

        handleBadRequest(ctx)
      }
    } catch (error) {
      debug(formatMessage(error ? error.stack : 'unknown error', ctx))

      handleBadRequest(ctx)
    }
  }
}
