import {dev as config} from '../webpack.config'
import createApp from 'express'
import createCompiler from 'webpack'
import createDevMiddleware from 'webpack-dev-middleware'
import createHotMiddleware from 'webpack-hot-middleware'
import {createServer} from 'http'
import router from './app/router'

const app = createApp()
const compiler = createCompiler(config)

app.use(createDevMiddleware(compiler, {
  noInfo: true, publicPath: config.output.publicPath
}))

app.use(createHotMiddleware(compiler))
app.use(router)

const server = createServer(app)

server.listen(3000, error => {
  if (error) throw error

  const {port} = server.address()

  console.log(`Server listening at http://localhost:${port}`)
})
