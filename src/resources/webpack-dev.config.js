import {APP_SERVER_DEV_PORT} from './server.config.js';
import {resolve} from 'path';

const REACT_PATH = resolve(__dirname, '../../node_modules/react/dist/react.js');

export default {
    debug: true,
    devtool: '#inline-source-map',
    entry: [
        resolve(__dirname, '../client/client.js'),
        `webpack-dev-server/client?http://localhost:${APP_SERVER_DEV_PORT}/`
    ],
    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loader: 'babel',
                test: /\.jsx?$/
            }
        ],
        noParse: [REACT_PATH]
    },
    output: {
        filename: 'client.js',
        path: resolve(__dirname, '../../public/scripts/'),
        publicPath: '/scripts/'
    },
    resolve: {
        alias: {react: REACT_PATH}
    },
    target: 'web'
};
