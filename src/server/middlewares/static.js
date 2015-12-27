import createDebug from 'debug'
import createRouter from 'koa-router'
import formatMessage from '../utils/format-message'
import {readdirSync} from 'fs'
import send from 'koa-send'

const debug = createDebug('clebert:static')

export default () => {
  const router = createRouter()

  for (const filename of readdirSync('./public')) {
    router.get(`/${filename}`, async ctx => {
      ctx.status = 200

      debug(formatMessage(`respond with status code ${ctx.status}`, ctx))

      await send(ctx, `./public/${filename}`)
    })
  }

  return router.routes()
}
