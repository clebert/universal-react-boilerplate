import {createHistory} from 'history'
import {applyMiddleware, createStore} from 'redux'
import promiseMiddleware from 'redux-promise'
import {Provider} from 'react-redux'
import React from 'react'
import reducer from '../app/reducer'
import {render} from 'react-dom'
import route from '../app/route'
import {Router} from 'react-router'
import {pushPath, syncReduxAndRouter} from 'redux-simple-router'

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore)

const store = createStoreWithMiddleware(reducer, window.__state)

store.subscribe(() => {
  if (store.getState().error != null && !/^\/oops\/?$/.test(window.location.pathname)) {
    store.dispatch(pushPath('/oops'))
  }
})

const history = createHistory()

syncReduxAndRouter(history, store)

render((
  <Provider store={store}>
    <Router history={history}>{route}</Router>
  </Provider>
), document.querySelector('main'))
