import {v4 as createUuid} from 'node-uuid'

export default () => {
  return async (ctx, next) => {
    ctx.id = createUuid()

    await next()
  }
}
