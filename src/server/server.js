import {APP_SERVER_PORT, APP_SERVER_DEV_PORT, WEBPACK_SERVER_PORT} from '../resources/server.config.js';
import {createProxyServer} from 'http-proxy';
import {createServer} from 'http';
import express from 'express';
import {renderApp} from './renderer.js';
import {resolve} from 'path';

const devMode = process.env.NODE_ENV !== 'production';

const proxyServer = devMode ? createProxyServer({
    changeOrigin: true,
    target: `http://localhost:${WEBPACK_SERVER_PORT}`,
    ws: true
}) : null;

if (devMode) {
    proxyServer.on('error', function () {});
}

const app = express();

if (devMode) {
    app.all('/scripts/*', proxyServer.web.bind(proxyServer));
    app.all('/socket.io/*', proxyServer.web.bind(proxyServer));
}

app.use(express.static(resolve(__dirname, '../../public/')));

app.get('/', function (request, response) {
    response.type('html').send(renderApp({fullName: 'John Doe'}));
});

const appServer = createServer(app);

if (devMode) {
    appServer.on('upgrade', proxyServer.ws.bind(proxyServer));
}

const icon = devMode ? '🚧' : '🌎';
const port = devMode ? APP_SERVER_DEV_PORT : APP_SERVER_PORT;

appServer.listen(port, function () {
    console.log(`${icon}  Application server is running on port ${port}.`);
});
