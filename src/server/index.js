import createApiMiddleware from './middlewares/api'
import createAppMiddleware from './middlewares/app'
import createAssetsMiddleware from './middlewares/assets'
import createDebug from 'debug'
import createDevMiddleware from './middlewares/dev'
import createErrorMiddleware from './middlewares/error'
import createHotMiddleware from './middlewares/hot'
import createIdMiddleware from './middlewares/id'
import createPathnameMiddleware from './middlewares/pathname'
import {createServer} from 'http'
import createSessionMiddleware from './middlewares/session'
import {v4 as createUuid} from 'node-uuid'
import Koa from 'koa'

const devMode = process.env.NODE_ENV === 'development'

const debug = createDebug('clebert:server')

const koa = new Koa()

koa.keys = [createUuid()]

koa.use(createErrorMiddleware())
koa.use(createIdMiddleware())
koa.use(createSessionMiddleware())
koa.use(createPathnameMiddleware())

if (devMode) {
  koa.use(createDevMiddleware())
  koa.use(createHotMiddleware())
}

koa.use(createAssetsMiddleware())
koa.use(createAppMiddleware())
koa.use(createApiMiddleware())

const server = createServer(koa.callback())

server.listen(3000, '0.0.0.0', error => {
  if (error) throw error

  const {address, port} = server.address()

  debug(`Server listening at http://${address}:${port} in ${process.env.NODE_ENV} mode`)
})
