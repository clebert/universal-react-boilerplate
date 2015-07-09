import {APP_SERVER_DEV_PORT} from './server.config.js';
import {HotModuleReplacementPlugin, NoErrorsPlugin} from 'webpack';
import {resolve} from 'path';

export default {
    debug: true,
    devtool: '#inline-source-map',
    entry: [
        `webpack-dev-server/client?http://localhost:${APP_SERVER_DEV_PORT}/`,
        'webpack/hot/only-dev-server',
        resolve(__dirname, '../client/client.js')
    ],
    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel'],
                test: /\.jsx?$/
            }
        ]
    },
    output: {
        filename: 'client.js',
        path: resolve(__dirname, '../../public/scripts/'),
        publicPath: '/scripts/'
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new NoErrorsPlugin()
    ],
    target: 'web'
};
