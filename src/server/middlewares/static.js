import createDebug from 'debug'
import createRouter from 'koa-router'
import format from '../utils/format'
import {readdirSync} from 'fs'
import send from 'koa-send'

const debug = createDebug('clebert:static')

export default () => {
  const router = createRouter()

  for (const filename of readdirSync('./public')) {
    router.get(`/${filename}`, async ctx => {
      debug(format(ctx, 'respond with status code 200'))

      await send(ctx, `./public/${filename}`)
    })
  }

  return router.routes()
}
