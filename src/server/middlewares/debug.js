import {v4 as createUuid} from 'node-uuid'

const devMode = process.env.NODE_ENV === 'development'

export default () => async (ctx, next) => {
  const id = createUuid().slice(0, 8)

  ctx.format = message => [
    ctx.method,
    ctx.url,
    id,
    ...(devMode ? [] : [ctx.sessionId || '', ctx.ip, new Date()]),
    message || ''
  ].join(' | ')

  await next()
}
