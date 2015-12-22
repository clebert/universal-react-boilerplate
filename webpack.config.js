const webpack = require('webpack')

module.exports = {
  externals: /^[a-zA-Z0-9]/,
  module: {
    loaders: [{loader: 'babel', test: /\.js$/}],
    preLoaders: [{loader: 'eslint', test: /\.js$/}]
  },
  output: {libraryTarget: 'commonjs2'},
  plugins: [new webpack.NoErrorsPlugin()],
  target: 'node'
}
