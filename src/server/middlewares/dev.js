import convert from 'koa-convert'
import createDevMiddleware from 'webpack-koa-dev-middleware'

export default (compiler, {output}) => convert(createDevMiddleware(compiler, {
  noInfo: true,
  publicPath: output.publicPath
}))
