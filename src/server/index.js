import createDebug from 'debug'
import createErrorMiddleware from './middlewares/error'
import createReactMiddleware from './middlewares/react'
import createReduxMiddleware from './middlewares/redux'
import {createServer} from 'http'
import createSessionMiddleware from './middlewares/session'
import createStaticMiddleware from './middlewares/static'
import Koa from 'koa'

const debug = createDebug('clebert:server')

const koa = new Koa()

koa.keys = ['2e865b08-76d4-41d8-9e6a-2a472297b7ae']

koa.use(createErrorMiddleware())
koa.use(createStaticMiddleware())
koa.use(createSessionMiddleware())
koa.use(createReduxMiddleware())
koa.use(createReactMiddleware())

const server = createServer(koa.callback())

server.listen(3000, '0.0.0.0', error => {
  if (error) throw error

  const {address, port} = server.address()

  debug(`Server listening at http://${address}:${port} in ${process.env.NODE_ENV} mode`)
})
