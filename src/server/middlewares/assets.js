import createDebug from 'debug'
import createRouter from 'koa-router'
import {readdirSync} from 'fs'
import send from 'koa-send'

const debug = createDebug('clebert:assets')

export default () => {
  const router = createRouter()

  for (const filename of readdirSync('./assets/')) {
    router.get(`/assets/${filename}`, async ctx => {
      ctx.status = 200

      debug(ctx.format(`respond with status code ${ctx.status}`))

      await send(ctx, `./assets/${filename}`)
    })
  }

  return router.routes()
}
