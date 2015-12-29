const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const devMode = process.env.NODE_ENV === 'development'
const testMode = process.env.NODE_ENV === 'test'

const cssLoader = 'css?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]'

module.exports = {
  bail: true,
  entry: [
    'source-map-support/register',
    testMode ? './test/index.js' : './src/server/index.js'
  ],
  debug: true,
  devtool: '#inline-source-map',
  externals: [
    {ActionCreators: false},
    /^[a-zA-Z0-9]/
  ],
  module: {
    loaders: [
      {
        loader: 'babel',
        query: {
          plugins: [
            'transform-async-to-generator',
            'transform-class-properties',
            'transform-es2015-block-scoping',
            'transform-es2015-destructuring',
            'transform-es2015-modules-commonjs',
            'transform-es2015-parameters',
            'transform-function-bind',
            'transform-object-rest-spread',
            'transform-react-jsx',
            'transform-strict-mode'
          ].concat(devMode ? [] : [
            'transform-react-constant-elements',
            'transform-react-inline-elements',
            'transform-remove-debugger'
          ])
        },
        test: /\.js$/
      },
      {
        loader: ExtractTextPlugin.extract('style', cssLoader),
        test: /\.css$/
      },
      {
        loader: 'url?limit=1000&minetype=image/png',
        test: /\.png$/
      }
    ],
    preLoaders: [{
      loader: 'eslint',
      test: /\.js$/
    }]
  },
  node: {
    __dirname: true
  },
  output: {
    filename: testMode ? 'test.js' : 'server.js',
    libraryTarget: 'commonjs2',
    path: './lib/',
    pathinfo: true
  },
  plugins: [
    new ExtractTextPlugin('server.css'),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    alias: {ActionCreators$: path.resolve('./src/server/actions.js')}
  },
  target: 'node'
}
