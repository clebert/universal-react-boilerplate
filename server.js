'use strict'

require('babel/register')

if (process.env.NODE_ENV === 'development') {
  require('./src/server/server.dev')
} else {
  require('./src/server/server')
}
