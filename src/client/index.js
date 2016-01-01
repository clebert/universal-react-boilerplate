import {applyMiddleware, createStore} from 'redux'
import {browserHistory, Router} from 'react-router'
import promiseMiddleware from 'redux-promise'
import {Provider} from 'react-redux'
import React from 'react'
import reducer from '../app/reducer'
import {render} from 'react-dom'
import route from '../app/route'
import {syncReduxAndRouter} from 'redux-simple-router'

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore)

const store = createStoreWithMiddleware(reducer, window.__state)

syncReduxAndRouter(browserHistory, store)

render((
  <Provider store={store}>
    <Router history={browserHistory}>{route}</Router>
  </Provider>
), document.querySelector('main'))
