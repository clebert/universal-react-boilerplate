import convert from 'koa-convert'
import createCompiler from 'webpack'
import createDevMiddleware from 'webpack-koa-dev-middleware'

export default config => convert(createDevMiddleware(createCompiler(config), {
  noInfo: true,
  publicPath: config.output.publicPath
}))
