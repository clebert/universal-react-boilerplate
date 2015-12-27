import createDebug from 'debug'
import {createRoutes, match, RoutingContext} from 'react-router'
import {createStore} from 'redux'
import formatMessage from '../utils/format-message'
import Layout from '../components/layout'
import {promisify} from 'bluebird'
import {Provider} from 'react-redux'
import React from 'react'
import {readFileSync} from 'fs'
import reducer from '../../shared/reducer'
import {renderToStaticMarkup} from 'react-dom/server'
import route from '../../shared/route'

const devMode = process.env.NODE_ENV === 'development'

const debug = createDebug('clebert:app')
const matchAsync = promisify(match, {multiArgs: true})
const readAssets = () => JSON.parse(readFileSync('./lib/assets.json', 'utf8')).main

export default () => {
  const Assets = devMode ? {js: 'client.js'} : readAssets()
  const title = 'Universal React Boilerplate'

  return async (ctx, next) => {
    const [redirectLocation, renderProps] = await matchAsync({
      location: ctx.originalUrl,
      routes: createRoutes(route)
    })

    if (redirectLocation) {
      const {pathname, search} = redirectLocation
      const url = `${pathname}${search}`

      ctx.status = 302

      debug(formatMessage(`${ctx.status} redirect to ${url}`, ctx))

      ctx.redirect(url)

      ctx.body = ctx.message
    } else if (renderProps) {
      ctx.status = 200

      debug(formatMessage(`respond with status code ${ctx.status}`, ctx))

      const store = createStore(reducer, ctx.session.state || {})

      ctx.body = '<!DOCTYPE html>' + renderToStaticMarkup((
        <Layout cssFilename={Assets['css']} jsFilename={Assets['js']} state={store.getState()} title={title}>
          {!devMode ? (
            <Provider store={store}>
              <RoutingContext {...renderProps}/>
            </Provider>
          ) : null}
        </Layout>
      ))
    } else {
      await next()
    }
  }
}
