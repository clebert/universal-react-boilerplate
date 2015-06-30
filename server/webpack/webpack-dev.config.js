import {APP_DEV_SERVER_PORT} from '../config.js';
import {resolve} from 'path';

const REACT_PATH = resolve(__dirname, '../../node_modules/react/dist/react.js');

export default {
    debug: true,
    devtool: '#inline-source-map',
    entry: [
        resolve(__dirname, '../../app/app.js'),
        `webpack-dev-server/client?http://localhost:${APP_DEV_SERVER_PORT}/`
    ],
    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loader: 'babel',
                test: /\.js$/
            }
        ],
        noParse: [REACT_PATH]
    },
    output: {
        filename: 'app.js',
        path: resolve(__dirname, '../../public/scripts/'),
        publicPath: '/scripts/'
    },
    resolve: {
        alias: {react: REACT_PATH}
    },
    target: 'web'
};
