import createDebug from 'debug'
import formatMessage from '../utils/format-message'
import {parse as parseUrl} from 'url'

const debug = createDebug('clebert:error')

const isAjaxRequest = ctx => ctx.get('X-Requested-With') === 'XMLHttpRequest'

const redirectToErrorPage = ctx => {
  const url = '/oops'

  ctx.status = 302

  debug(formatMessage(`${ctx.status} redirect to ${url}`, ctx))

  ctx.redirect(url)

  ctx.body = ctx.message
}

const handleBadRequest = ctx => {
  const ajax = isAjaxRequest(ctx)
  const {message, originalUrl, status} = ctx
  const {pathname} = parseUrl(originalUrl)

  if (ctx.accepts('html') && !ajax && !/^\/oops\/?$/.test(pathname)) {
    redirectToErrorPage(ctx)
  } else if (ctx.accepts('json') && ajax) {
    ctx.body = {error: message}
  } else {
    ctx.body = `${status} ${message}`
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
