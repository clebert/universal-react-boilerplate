import createApiMiddleware from './middlewares/api'
import createAppMiddleware from './middlewares/app'
import createAssetsMiddleware from './middlewares/assets'
import createCompiler from 'webpack'
import createDebug from 'debug'
import createDevMiddleware from './middlewares/dev'
import createErrorMiddleware from './middlewares/error'
import createFormatMiddleware from './middlewares/format'
import createHotMiddleware from './middlewares/hot'
import createIdMiddleware from './middlewares/id'
import createInfoMiddleware from './middlewares/info'
import createPathnameMiddleware from './middlewares/pathname'
import {createServer} from 'http'
import createSessionMiddleware from './middlewares/session'
import {v4 as createUuid} from 'node-uuid'
import Koa from 'koa'
import webpackConfig from './configs/webpack-client'

const devMode = process.env.NODE_ENV === 'development'

const debug = createDebug('clebert:server')

const koa = new Koa()

koa.keys = [createUuid()]

koa.use(createErrorMiddleware())
koa.use(createSessionMiddleware())
koa.use(createFormatMiddleware())
koa.use(createIdMiddleware())
koa.use(createInfoMiddleware())
koa.use(createPathnameMiddleware())

if (devMode) {
  const compiler = createCompiler(webpackConfig)

  koa.use(createDevMiddleware(compiler, webpackConfig))
  koa.use(createHotMiddleware(compiler))
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
