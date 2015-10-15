'use strict'

require('babel/register')

if (process.env.NODE_ENV === 'development') {
  module.exports = require('./src/webpack.config').dev
} else {
  module.exports = require('./src/webpack.config').prod
}
