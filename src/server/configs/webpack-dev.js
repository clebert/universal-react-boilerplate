import {resolve} from 'path';
import webpack from 'webpack';

export default {
    debug: true,
    devtool: '#inline-source-map',
    entry: [
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client',
        resolve(__dirname, '../../client/index.js')
    ],
    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel'],
                test: /\.js$/
            }
        ]
    },
    output: {
        filename: 'client.js',
        path: resolve(__dirname, '../../../public/scripts/'),
        publicPath: '/scripts/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    target: 'web'
};
