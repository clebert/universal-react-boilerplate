import createDebug from 'debug'
import {parse as parseUrl} from 'url'

const debug = createDebug('clebert:error')

const handleError = (ctx, error, {
  createErrorMessage = ({message}) => ({error: message}),
  errorPageUrl = '/oops',
  shouldRedirectToErrorPage = ({originalUrl}) => {
    const {pathname} = parseUrl(originalUrl)

    return ![/^\/api\//, /^\/assets\//, /^\/oops\/?$/].some(re => re.test(pathname))
  }
} = {}) => {
  try {
    if (errorPageUrl && shouldRedirectToErrorPage(ctx)) {
      ctx.status = 302

      debug(ctx.format(`${ctx.status} redirect to ${errorPageUrl}`))

      ctx.redirect(errorPageUrl)
    } else {
      ctx.body = createErrorMessage(ctx, error)
    }
  } catch (error) {
    debug(ctx.format('error handling failed'))

    ctx.status = 500

    ctx.body = ctx.message
  }
}

export default options => async (ctx, next) => {
  ctx.format = ctx.format || (message => message)

  try {
    await next()

    const {status} = ctx

    if (status >= 400) {
      debug(ctx.format(`handle status code ${status}`))

      handleError(ctx, null, options)
    }
  } catch (error) {
    debug(ctx.format(`handle ${(error ? error.stack : '') || 'unknown error'}`))

    handleError(ctx, error, options)
  }
}
