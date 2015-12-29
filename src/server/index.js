import createApiMiddleware from './middlewares/api'
import createAppMiddleware from './middlewares/app'
import createAssetsMiddleware from './middlewares/assets'
import createCompiler from 'webpack'
import createDebug from 'debug'
import createDebugMiddleware from './middlewares/debug'
import createDevMiddleware from './middlewares/dev'
import createErrorMiddleware from './middlewares/error'
import createHotMiddleware from './middlewares/hot'
import createPathnameMiddleware from './middlewares/pathname'
import {createServer} from 'http'
import createSessionMiddleware from './middlewares/session'
import {v4 as createUuid} from 'node-uuid'
import Koa from 'koa'
import webpackConfig from '../client/webpack.config'

const devMode = process.env.NODE_ENV === 'development'

const debug = createDebug('clebert:server')

const koa = new Koa()

koa.keys = [createUuid()]

koa.use(createErrorMiddleware())
koa.use(createSessionMiddleware())
koa.use(createDebugMiddleware())
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
