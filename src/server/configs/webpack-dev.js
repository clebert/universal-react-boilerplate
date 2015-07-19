import * as Ports from './ports';
import {resolve} from 'path';
import webpack from 'webpack';

export default {
    debug: true,
    devtool: '#inline-source-map',
    entry: [
        `webpack-dev-server/client?http://localhost:${Ports.appServer}/`,
        'webpack/hot/only-dev-server',
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
