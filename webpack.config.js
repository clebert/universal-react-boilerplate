const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

const devMode = process.env.NODE_ENV === 'development'

console.log(`Compiling server in ${devMode ? 'development' : 'production'} mode...`)

const entry = [
  './src/server/index.js'
]

if (devMode) {
  entry.unshift('source-map-support/register')
}

const babelPlugins = [
  'transform-class-properties',
  'transform-es2015-destructuring',
  'transform-es2015-modules-commonjs',
  'transform-es2015-parameters',
  'transform-function-bind',
  'transform-object-rest-spread',
  'transform-react-jsx',
  'transform-strict-mode'
]

if (!devMode) {
  babelPlugins.push('transform-react-constant-elements')
  babelPlugins.push('transform-react-inline-elements')
  babelPlugins.push('transform-remove-debugger')
}

const babelLoader = {
  loader: 'babel',
  query: {plugins: babelPlugins},
  test: /\.js$/
}

const cssLoaderString = 'css?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]'

const cssLoader = {
  loader: ExtractTextPlugin.extract('style', cssLoaderString),
  test: /\.css$/
}

const eslintLoader = {
  loader: 'eslint',
  test: /\.js$/
}

const pngLoader = {
  loader: 'url?limit=1000&minetype=image/png',
  test: /\.png$/
}

module.exports = {
  debug: devMode,
  devtool: devMode ? '#inline-source-map' : null,
  entry: entry,
  externals: /^[a-zA-Z0-9]/,
  module: {
    loaders: [babelLoader, cssLoader, pngLoader],
    preLoaders: [eslintLoader]
  },
  node: {
    __dirname: true
  },
  output: {
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    path: './lib/',
    pathinfo: devMode
  },
  plugins: [
    new ExtractTextPlugin('useless.css'),
    new webpack.NoErrorsPlugin()
  ],
  target: 'node'
}
