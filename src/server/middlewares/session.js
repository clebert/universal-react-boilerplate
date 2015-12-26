import convert from 'koa-convert'
import createSessionMiddleware from 'koa-generic-session'

export default () => convert(createSessionMiddleware())
