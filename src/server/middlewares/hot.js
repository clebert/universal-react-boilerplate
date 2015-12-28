import convert from 'koa-convert'
import createHotMiddleware from 'webpack-koa-hot-middleware'

export default compiler => convert(createHotMiddleware(compiler))
