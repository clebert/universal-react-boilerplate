export default (ctx, message) => [
  ctx.url,
  ctx.sessionId || '',
  message || ''
].join(' | ')
