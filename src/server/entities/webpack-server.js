import webpack from 'webpack';
import webpackConfig from '../configs/webpack-dev';
import WebpackDevServer from 'webpack-dev-server';

export default new WebpackDevServer(webpack(webpackConfig), {
    hot: true,
    publicPath: '/scripts/',
    stats: {colors: true}
});
