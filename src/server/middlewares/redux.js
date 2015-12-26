import createDebug from 'debug'
import {createStore} from 'redux'
import format from '../utils/format'

const debug = createDebug('clebert:redux')

export default () => {
  return async (ctx, next) => {
    const {session} = ctx

    debug(format(ctx, 'load state from session and create store'))

    ctx.store = createStore((state = {}) => state, session.state || {}) // TODO: use real reducer...

    await next()

    debug(format(ctx, 'save state to session'))

    session.state = ctx.store.getState()
  }
}
