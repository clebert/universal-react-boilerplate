import createDebug from 'debug'

const debug = createDebug('clebert:info')

export default () => async (ctx, next) => {
  debug([
    ctx.id ? ctx.id.slice(0, 8) : '',
    ctx.method,
    ctx.url,
    ctx.sessionId || '',
    ctx.ip,
    new Date()
  ].join(' | '))

  await next()
}
