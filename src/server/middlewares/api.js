import createDebug from 'debug'
import createRouter from 'koa-router'
import formatMessage from '../utils/format-message'
import {json as parseJsonAsync} from 'co-body'

const debug = createDebug('clebert:api')

const syncStateAsync = async ctx => {
  if (!ctx.accepts('json')) {
    ctx.throw(406)
  } else if (ctx.is('json')) {
    ctx.session.state = await parseJsonAsync(ctx)

    ctx.status = 200

    debug(formatMessage(`respond with status code ${ctx.status}`, ctx))

    ctx.body = {}
  } else {
    ctx.throw(415)
  }
}

export default () => {
  const router = createRouter()

  router.post('/api/sync-state', syncStateAsync)

  return router.routes()
}
