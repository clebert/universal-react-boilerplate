import {createHistory} from 'history'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import React from 'react'
import reducer from '../shared/reducer'
import {render} from 'react-dom'
import route from '../shared/route'
import {Router} from 'react-router'
import {syncReduxAndRouter} from 'redux-simple-router'

const history = createHistory()

const store = createStore(reducer, window.__state)

store.subscribe(() => {
  // TODO
})

syncReduxAndRouter(history, store)

render((
  <Provider store={store}>
    <Router history={history}>{route}</Router>
  </Provider>
), document.querySelector('main'))
