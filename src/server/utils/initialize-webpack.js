import webpack from 'webpack';
import webpackConfig from '../configs/webpack-dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

export default function (app) {
    const webpackCompiler = webpack(webpackConfig);

    app.use(webpackDevMiddleware(webpackCompiler, {
        publicPath: '/scripts/',
        stats: {colors: true}
    }));

    app.use(webpackHotMiddleware(webpackCompiler));
}
