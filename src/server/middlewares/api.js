import createDebug from 'debug'
import createRouter from 'koa-router'
import {json as parseJsonAsync} from 'co-body'

const debug = createDebug('clebert:api')

const syncStateAsync = async ctx => {
  if (ctx.is('json')) {
    ctx.session.state = await parseJsonAsync(ctx)

    ctx.status = 200

    debug(ctx.format(`respond with status code ${ctx.status}`))

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
