import convert from 'koa-convert'
import createCompiler from 'webpack'
import createDevMiddleware from 'webpack-koa-dev-middleware'
import webpackConfig from '../configs/webpack-client'

export default () => convert(createDevMiddleware(createCompiler(webpackConfig), {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}))
