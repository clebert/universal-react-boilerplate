import createDebug from 'debug'
import {createRoutes, match, RoutingContext} from 'react-router'
import format from '../utils/format'
import Layout from '../components/layout'
import {promisify} from 'bluebird'
import {Provider} from 'react-redux'
import React from 'react'
import {readFileSync} from 'fs'
import {renderToStaticMarkup} from 'react-dom/server'
import Root from '../../shared/components/root'

const devMode = process.env.NODE_ENV === 'development'

const debug = createDebug('clebert:react')
const matchAsync = promisify(match, {multiArgs: true})

const readAssets = () => {
  try {
    return JSON.parse(readFileSync('./lib/assets.json', 'utf8')).main
  } catch (e) {
    return {css: 'client.css', js: 'client.js'}
  }
}

export default () => {
  const Assets = readAssets()
  const cssURLs = Assets['css'] ? [Assets['css']] : []
  const jsURLs = Assets['js'] ? [Assets['js']] : []
  const title = 'Universal React Boilerplate'

  return async (ctx, next) => {
    const [redirectLocation, renderProps] = await matchAsync({
      location: ctx.url,
      routes: createRoutes(Root)
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
        <Layout cssURLs={cssURLs} jsURLs={jsURLs} state={store.getState()} title={title}>
          {(() => !devMode ? (
            <Provider store={store}>
              <RoutingContext {...renderProps}/>
            </Provider>
          ) : null)()}
        </Layout>
      ))

      debug(format(ctx, 'respond with status code 200'))
    } else {
      debug(format(ctx, 'call next middleware'))

      await next()
    }
  }
}