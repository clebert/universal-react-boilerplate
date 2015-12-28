import {v4 as createUuid} from 'node-uuid'

export default () => async (ctx, next) => {
  ctx.id = createUuid()

  await next()
}
