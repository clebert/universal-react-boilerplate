import createDebug from 'debug'
import {createRoutes, match, RoutingContext} from 'react-router'
import format from '../utils/format'
import Layout from '../components/layout'
import {promisify} from 'bluebird'
import {Provider} from 'react-redux'
import React from 'react'
import {readFileSync} from 'fs'
import {renderToStaticMarkup} from 'react-dom/server'
import route from '../../shared/route'

const devMode = process.env.NODE_ENV === 'development'

const debug = createDebug('clebert:react')
const matchAsync = promisify(match, {multiArgs: true})
const readAssets = () => JSON.parse(readFileSync('./lib/assets.json', 'utf8')).main

export default () => {
  const Assets = devMode ? {js: 'client.js'} : readAssets()
  const title = 'Universal React Boilerplate'

  return async (ctx, next) => {
    const [redirectLocation, renderProps] = await matchAsync({
      location: ctx.url,
      routes: createRoutes(route)
    })

    if (redirectLocation) {
      const {pathname, search} = redirectLocation
      const url = pathname + search

      debug(format(ctx, `redirect to ${url}`))

      ctx.redirect(url)
    } else if (renderProps) {
      const {store} = ctx

      ctx.status = 200

      ctx.body = '<!DOCTYPE html>' + renderToStaticMarkup((
        <Layout cssFilename={Assets['css']} jsFilename={Assets['js']} state={store.getState()} title={title}>
          {!devMode ? (
            <Provider store={store}>
              <RoutingContext {...renderProps}/>
            </Provider>
          ) : null}
        </Layout>
      ))

      debug(format(ctx, 'respond with status code 200'))
    } else {
      debug(format(ctx, 'call next middleware'))

      await next()
    }
  }
}
