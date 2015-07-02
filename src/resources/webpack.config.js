import {resolve} from 'path';
import Webpack from 'webpack';

const REACT_PATH = resolve(__dirname, '../../node_modules/react/dist/react.min.js');

export default {
    entry: [
        resolve(__dirname, '../client/client.js')
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
        path: resolve(__dirname, '../../public/scripts/')
    },
    plugins: [
        new Webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false}
        })
    ],
    resolve: {
        alias: {react: REACT_PATH}
    },
    target: 'web'
};
