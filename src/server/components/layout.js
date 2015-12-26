import escapeHTML from 'escape-html'
import React, {PropTypes} from 'react'
import {renderToString} from 'react-dom/server'

const renderToJSON = object => {
  return JSON.stringify(object, (key, value) => {
    return typeof value === 'string' ? escapeHTML(value) : value
  })
}

const Layout = ({children, cssURL, jsURL, state, title}) => (
  <html lang='en'>
    <head>
      <title>{title}</title>

      <meta name='viewport' content={[
        'width=device-width',
        'initial-scale=1',
        'maximum-scale=1',
        'user-scalable=no'
      ].join(', ')}/>

      {cssURL ? <link rel='stylesheet' href={cssURL}/> : null}
    </head>
    <body>
      <main dangerouslySetInnerHTML={{
        __html: children ? renderToString(children) : ''
      }}/>

      <script dangerouslySetInnerHTML={{
        __html: 'window.__state = ' + renderToJSON(state)
      }}/>

      {jsURL ? <script src={jsURL}/> : null}
    </body>
  </html>
)

export default Layout

Layout.propTypes = {
  children: PropTypes.element,
  cssURL: PropTypes.string,
  jsURL: PropTypes.string,
  state: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
}
