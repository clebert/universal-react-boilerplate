import {resolve} from 'path'
import webpack from 'webpack'

const entry = [
  resolve(__dirname, './client/client.js')
]

const jsLoader = {
  include: resolve(__dirname, 'client/'),
  loader: 'babel',
  test: /\.js$/
}

const output = {
  filename: 'client.js',
  path: resolve(__dirname, '../public/scripts/')
}

const plugins = [
  new webpack.optimize.OccurenceOrderPlugin()
]

const target = 'web'

export const dev = {
  debug: true,
  devtool: '#inline-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    ...entry
  ],
  module: {
    loaders: [
      {
        ...jsLoader,
        query: {
          extra: {
            'react-transform': {
              transforms: [
                {
                  transform: 'react-transform-catch-errors',
                  imports: ['react', 'redbox-react']
                },
                {
                  transform: 'react-transform-hmr',
                  imports: ['react'],
                  locals: ['module']
                }
              ]
            }
          },
          optional: ['runtime'],
          plugins: ['react-transform'],
          stage: 0
        }
      }
    ]
  },
  output: {
    ...output,
    publicPath: '/scripts/'
  },
  plugins: [
    ...plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  target
}

export const prod = {
  entry,
  module: {
    loaders: [jsLoader],
    postLoaders: [
      {
        loader: 'transform?envify'
      }
    ]
  },
  output,
  plugins: [
    ...plugins,
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
  ],
  target
}
