import convert from 'koa-convert'
import createCompiler from 'webpack'
import createHotMiddleware from 'webpack-koa-hot-middleware'
import webpackConfig from '../configs/webpack-client'

export default () => convert(createHotMiddleware(createCompiler(webpackConfig)))
