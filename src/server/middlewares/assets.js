import {basename, extname} from 'path'
import createDebug from 'debug'
import createRouter from 'koa-router'
import {promisify} from 'bluebird'
import {createReadStream, readdirSync, stat as readStats} from 'fs'

const debug = createDebug('clebert:assets')

const readStatsAsync = promisify(readStats)

const send = async (ctx, filename, maxAge) => {
  const stats = await readStatsAsync(filename)

  ctx.set('Cache-Control', `max-age=${maxAge / 1000 | 0}`)
  ctx.set('Content-Length', stats.size)
  ctx.set('Last-Modified', stats.mtime.toUTCString())

  ctx.status = 200

  debug(ctx.format(`respond with status code ${ctx.status}`))

  ctx.body = createReadStream(filename)
  ctx.type = extname(basename(filename))
}

export default (maxAge = 0) => {
  const router = createRouter()

  for (const filename of readdirSync('./assets/')) {
    router.get(`/assets/${filename}`, async ctx => await send(ctx, `./assets/${filename}`, maxAge))
  }

  return router.routes()
}
