import * as api from '../api'
import createDebug from 'debug'
import createRouter from 'koa-router'
import {json as parseJsonAsync} from 'co-body'

const debug = createDebug('clebert:api')

const registerRoute = (router, name) => {
  const getDataAsync = api[`${name}Async`]

  router.post(`/api/${name}`, async ctx => {
    if (ctx.is('json')) {
      ctx.body = await getDataAsync(await parseJsonAsync(ctx))

      ctx.status = 200

      debug(ctx.format(`respond with status code ${ctx.status}`))
    } else {
      ctx.throw(415)
    }
  })
}

export default () => {
  const router = createRouter()

  registerRoute(router, 'getBookmarks')

  return router.routes()
}
