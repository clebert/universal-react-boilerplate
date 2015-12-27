import createApiMiddleware from './middlewares/api'
import createAppMiddleware from './middlewares/app'
import createCompiler from 'webpack'
import createDebug from 'debug'
import createDevMiddleware from './middlewares/dev'
import createErrorMiddleware from './middlewares/error'
import createHotMiddleware from './middlewares/hot'
import createIdMiddleware from './middlewares/id'
import {createServer} from 'http'
import createSessionMiddleware from './middlewares/session'
import createStaticMiddleware from './middlewares/static'
import createUrlMiddleware from './middlewares/url'
import {v4 as createUuid} from 'node-uuid'
import Koa from 'koa'
import webpackConfig from './configs/webpack-client'

const devMode = process.env.NODE_ENV === 'development'

const debug = createDebug('clebert:server')

const koa = new Koa()

koa.keys = [createUuid()]

koa.use(createErrorMiddleware())
koa.use(createIdMiddleware())
koa.use(createSessionMiddleware())
koa.use(createUrlMiddleware())

if (devMode) {
  const compiler = createCompiler(webpackConfig)

  koa.use(createDevMiddleware(compiler))
  koa.use(createHotMiddleware(compiler))
}

koa.use(createStaticMiddleware())
koa.use(createAppMiddleware())
koa.use(createApiMiddleware())

const server = createServer(koa.callback())

server.listen(3000, '0.0.0.0', error => {
  if (error) throw error

  const {address, port} = server.address()

  debug(`Server listening at http://${address}:${port} in ${process.env.NODE_ENV} mode`)
})
