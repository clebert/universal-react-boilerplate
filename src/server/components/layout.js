import escapeHTML from 'escape-html'
import React, {PropTypes} from 'react'
import {renderToString} from 'react-dom/server'

const renderToJSON = object => {
  return JSON.stringify(object, (key, value) => {
    return typeof value === 'string' ? escapeHTML(value) : value
  })
}

const Layout = ({children, cssFilename, jsFilename, state, title}) => (
  <html lang='en'>
    <head>
      <title>{title}</title>

      <meta name='viewport' content={[
        'width=device-width',
        'initial-scale=1',
        'maximum-scale=1',
        'user-scalable=no'
      ].join(', ')}/>

      {cssFilename ? <link rel='stylesheet' href={`/${cssFilename}`}/> : null}
    </head>
    <body>
      <main dangerouslySetInnerHTML={{
        __html: children ? renderToString(children) : ''
      }}/>

      <script dangerouslySetInnerHTML={{
        __html: 'window.__state = ' + renderToJSON(state)
      }}/>

      {jsFilename ? <script src={`/${jsFilename}`}/> : null}
    </body>
  </html>
)

export default Layout

Layout.propTypes = {
  children: PropTypes.element,
  cssFilename: PropTypes.string,
  jsFilename: PropTypes.string,
  state: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
}
