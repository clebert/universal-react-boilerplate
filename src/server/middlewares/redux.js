import createDebug from 'debug'
import {createStore} from 'redux'
import format from '../utils/format'
import reducer from '../../shared/reducer'

const debug = createDebug('clebert:redux')

export default () => {
  return async (ctx, next) => {
    const {session} = ctx

    debug(format(ctx, 'load state from session and create store'))

    ctx.store = createStore(reducer, session.state || {})

    await next()

    debug(format(ctx, 'save state to session'))

    session.state = ctx.store.getState()
  }
}
