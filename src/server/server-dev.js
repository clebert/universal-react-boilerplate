import {
    APP_SERVER_DEV_ICON,
    APP_SERVER_DEV_PORT,
    WEBPACK_SERVER_ICON,
    WEBPACK_SERVER_PORT
} from '../resources/server.config.js';

import {createProxyServer} from 'http-proxy';
import {createServer} from 'http';
import express from 'express';
import {renderApp} from './renderer.js';
import {resolve} from 'path';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import webpackDevConfig from '../resources/webpack-dev.config.js';

const proxyServer = createProxyServer({
    changeOrigin: true,
    target: `http://localhost:${WEBPACK_SERVER_PORT}`,
    ws: true
});

proxyServer.on('error', function () {});

const webpackServer = new WebpackDevServer(webpack(webpackDevConfig), {
    hot: true,
    publicPath: '/scripts/',
    stats: {colors: true}
});

webpackServer.listen(WEBPACK_SERVER_PORT, 'localhost', function () {
    console.log(`${WEBPACK_SERVER_ICON}  Webpack server is running on port ${WEBPACK_SERVER_PORT}.`);
});

const app = express();

app.all('/scripts/*', proxyServer.web.bind(proxyServer));
app.all('/socket.io/*', proxyServer.web.bind(proxyServer));

app.use(express.static(resolve(__dirname, '../../public/')));

app.get('/', function (request, response) {
    response.type('html').send(renderApp({fullName: 'John Doe'}));
});

const appServer = createServer(app);

appServer.on('upgrade', proxyServer.ws.bind(proxyServer));

appServer.listen(APP_SERVER_DEV_PORT, function () {
    console.log(`${APP_SERVER_DEV_ICON}  Application server is running on port ${APP_SERVER_DEV_PORT}.`);
});
