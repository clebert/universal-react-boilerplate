const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

const prodMode = process.env.NODE_ENV === 'production'
const testMode = process.env.NODE_ENV === 'test'

const babelPlugins = [
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
]

if (prodMode) {
  babelPlugins.push('transform-react-constant-elements')
  babelPlugins.push('transform-react-inline-elements')
  babelPlugins.push('transform-remove-debugger')
}

const cssLoaderQuery = 'modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]'

module.exports = {
  bail: true,
  entry: [
    'source-map-support/register',
    testMode ? './test/index.js' : './src/index.js'
  ],
  debug: true,
  devtool: '#inline-source-map',
  externals: /^[a-zA-Z0-9]/,
  module: {
    loaders: [
      {
        loader: 'babel',
        query: {plugins: babelPlugins},
        test: /\.js$/
      },
      {
        loader: ExtractTextPlugin.extract('style', 'css?' + cssLoaderQuery),
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
    filename: testMode ? 'test.js' : 'index.js',
    libraryTarget: 'commonjs2',
    path: './lib/',
    pathinfo: true
  },
  plugins: [
    new ExtractTextPlugin('index.css'),
    new webpack.NoErrorsPlugin()
  ],
  target: 'node'
}
