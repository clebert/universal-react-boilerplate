import App from './app/components'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import React from 'react'
import reducer from './app/reducers'
import {render} from 'react-dom'

const store = createStore(reducer, window.initialState)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('main')
)

if (module.hot) {
  module.hot.accept('./app/reducers', () => {
    store.replaceReducer(require('./app/reducers'))
  })
}
