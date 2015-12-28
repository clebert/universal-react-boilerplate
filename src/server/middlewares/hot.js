import convert from 'koa-convert'
import createCompiler from 'webpack'
import createHotMiddleware from 'webpack-koa-hot-middleware'

export default config => convert(createHotMiddleware(createCompiler(config)))
