import {applyMiddleware, createStore} from 'redux'
import {browserHistory} from 'react-router'
import promiseMiddleware from 'redux-promise'
import {Provider} from 'react-redux'
import React from 'react'
import reducer from '../app/reducer'
import {render} from 'react-dom'
import route from '../app/route'
import {Router} from 'react-router'

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore)

const store = createStoreWithMiddleware(reducer, window.__state)

store.subscribe(() => {
  if (store.getState().error != null && !/^\/oops\/?$/.test(window.location.pathname)) {
    browserHistory.push('/oops')
  }
})

render((
  <Provider store={store}>
    <Router history={browserHistory}>{route}</Router>
  </Provider>
), document.querySelector('main'))
