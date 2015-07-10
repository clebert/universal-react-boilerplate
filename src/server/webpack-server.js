import {WEBPACK_SERVER_PORT} from '../resources/server.config.js';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import webpackDevConfig from '../resources/webpack-dev.config.js';

const webpackServer = new WebpackDevServer(webpack(webpackDevConfig), {
    hot: true,
    publicPath: '/scripts/',
    stats: {colors: true}
});

webpackServer.listen(WEBPACK_SERVER_PORT, 'localhost', function () {
    console.log(`🚧  Webpack server is running on port ${WEBPACK_SERVER_PORT}.`);
});
