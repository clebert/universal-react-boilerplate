import createDebug from 'debug'
import format from '../utils/format'

const debug = createDebug('clebert:error')

export default () => {
  return async (ctx, next) => {
    try {
      await next()

      const {status} = ctx

      if (status >= 400) {
        const url = '/oops'

        debug(format(ctx, `redirect to ${url} because of status code ${status}`))

        ctx.redirect(url)
      }
    } catch (error) {
      debug(format(ctx, error ? error.stack : 'unknown error'))

      ctx.status = 500
      ctx.body = ctx.message
    }
  }
}
