const AssetsPlugin = require('assets-webpack-plugin')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const lost = require('lost')
const path = require('path')
const stylelint = require('stylelint')
const webpack = require('webpack')

const devMode = process.env.NODE_ENV === 'development'

const cssLoader = 'css?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]'

module.exports = {
  bail: true,
  entry: (devMode ? [
    'webpack-hot-middleware/client?reload=true'
  ] : []).concat([
    './src/client/index.js'
  ]),
  debug: devMode,
  devtool: devMode ? '#inline-source-map' : null,
  module: {
    loaders: [
      {
        include: path.resolve('./node_modules/'),
        loader: 'babel',
        query: {
          babelrc: false,
          plugins: [
            'transform-node-env-inline',
            'transform-undefined-to-void'
          ]
        },
        test: /\.js$/
      },
      {
        include: path.resolve('./src/'),
        loader: 'babel',
        query: {
          plugins: [
            'transform-async-to-generator',
            'transform-class-properties',
            'transform-function-bind',
            'transform-node-env-inline',
            'transform-object-rest-spread',
            'transform-react-jsx',
            'transform-strict-mode',
            'transform-undefined-to-void'
          ].concat(!devMode ? [
            'transform-react-constant-elements',
            'transform-react-inline-elements',
            'transform-remove-console',
            'transform-remove-debugger'
          ] : []),
          presets: ['es2015']
        },
        test: /\.js$/
      },
      {
        include: path.resolve('./src/'),
        loader: devMode ? 'style!' + cssLoader : ExtractTextPlugin.extract('style', cssLoader),
        test: /\.css$/
      },
      {
        include: path.resolve('./src/'),
        loader: 'url?limit=1000&minetype=image/png',
        test: /\.png$/
      }
    ],
    preLoaders: [{
      include: path.resolve('./src/'),
      loader: 'eslint',
      test: /\.js$/
    }]
  },
  node: {
    __dirname: true
  },
  output: {
    filename: `client${devMode ? '' : '.[hash]'}.js`,
    libraryTarget: 'var',
    path: path.resolve('./public/'),
    pathinfo: devMode
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ].concat(devMode ? [
    new webpack.HotModuleReplacementPlugin()
  ] : [
    new AssetsPlugin({filename: './lib/assets.json'}),
    new ExtractTextPlugin(`client${devMode ? '' : '.[hash]'}.css`),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {warnings: false}
    })
  ]),
  postcss: [
    stylelint(),
    lost(),
    autoprefixer('last 2 versions')
  ].concat(!devMode ? [
    cssnano()
  ] : []),
  target: 'web'
}
