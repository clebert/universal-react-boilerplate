import {resolve} from 'path';
import webpack from 'webpack';

const reactPath = resolve(__dirname, '../../../node_modules/react/dist/react.min.js');

export default {
    entry: [
        resolve(__dirname, '../../client/index.js')
    ],
    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loader: 'babel',
                test: /\.js$/
            }
        ],
        noParse: [reactPath]
    },
    output: {
        filename: 'client.js',
        path: resolve(__dirname, '../../../public/scripts/')
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false}
        })
    ],
    resolve: {
        alias: {react: reactPath}
    },
    target: 'web'
};
