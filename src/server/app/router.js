import App from '../../client/app/components'
import compile from 'string-template/compile'
import {createStore} from 'redux'
import {name as title} from '../../../package'
import {Provider} from 'react-redux'
import {Router as createRouter, static as createStaticMiddleware} from 'express'
import React from 'react'
import {readFileSync} from 'fs'
import reducer from '../../client/app/reducers'
import {renderToString} from 'react-dom/server'
import {resolve} from 'path'

const router = createRouter()

export default router

router.use(createStaticMiddleware(resolve(__dirname, '../../../public/'), {index: false}))

const createHtml = compile(readFileSync(resolve(__dirname, '../../client/client.html')).toString())
const store = createStore(reducer, {})

router.get('*', function (req, res, next) {
  const app = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )

  const initialState = JSON.stringify(store.getState())

  res.send(createHtml({app, initialState, title}))
})
