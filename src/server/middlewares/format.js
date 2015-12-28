export default () => async (ctx, next) => {
  ctx.format = message => [
    ctx.id ? ctx.id.slice(0, 8) : '',
    message || ''
  ].join(' | ')

  await next()
}
