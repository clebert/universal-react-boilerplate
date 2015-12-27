export default (message, ctx) => [
  ctx.id ? ctx.id.slice(0, 8) : '',
  ctx.method,
  ctx.url,
  ctx.sessionId || '',
  ctx.ip,
  message || ''
].join(' | ')
