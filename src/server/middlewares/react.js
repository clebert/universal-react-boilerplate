import createDebug from 'debug'
import {createRoutes, match, RoutingContext} from 'react-router'
import format from '../utils/format'
import Layout from '../components/layout'
import {promisify} from 'bluebird'
import {Provider} from 'react-redux'
import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import Root from '../../shared/components/root'

const prodMode = process.env.NODE_ENV === 'production'

const debug = createDebug('clebert:react')
const matchAsync = promisify(match, {multiArgs: true})

export default () => {
  const cssURLs = [] // TODO: use css assets...
  const jsURLs = [] // TODO: use js assets...
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
          {(() => prodMode ? (
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
