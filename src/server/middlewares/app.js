import createDebug from 'debug'
import {createRoutes, match, RouterContext} from 'react-router'
import {createStore} from 'redux'
import Layout from '../components/Layout'
import {promisify} from 'bluebird'
import {Provider} from 'react-redux'
import React from 'react'
import {readFileSync} from 'fs'
import reducer from '../../app/reducer'
import {renderToStaticMarkup} from 'react-dom/server'
import route from '../../app/route'

const devMode = process.env.NODE_ENV === 'development'

const debug = createDebug('clebert:app')

const matchAsync = promisify(match, {multiArgs: true})

const readAssets = () => JSON.parse(readFileSync('./lib/assets.json', 'utf8')).main

export default () => {
  const Assets = devMode ? {js: '/assets/client.js'} : readAssets()
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

      debug(ctx.format(`${ctx.status} redirect to ${url}`))

      ctx.redirect(url)

      ctx.body = ctx.message
    } else if (renderProps) {
      ctx.status = 200

      debug(ctx.format(`respond with status code ${ctx.status}`))

      const store = createStore(reducer, ctx.session.state || {})

      ctx.body = '<!DOCTYPE html>' + renderToStaticMarkup((
        <Layout cssFilename={Assets['css']} jsFilename={Assets['js']} state={store.getState()} title={title}>
          {devMode ? null : (
            <Provider store={store}>
              <RouterContext {...renderProps}/>
            </Provider>
          )}
        </Layout>
      ))
    } else {
      await next()
    }
  }
}
