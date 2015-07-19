import express from 'express';
import {createServer} from 'http';
import * as Ports from './configs/ports';
import renderClient from './utils/render-client';
import {resolve} from 'path';
import store from './modules/store';

const devMode = process.env.NODE_ENV !== 'production';

const app = express();

const proxy = devMode ? require('./modules/proxy') : null;

if (devMode) {
    app.all('/scripts/*', ::proxy.web);
    app.all('/socket.io/*', ::proxy.web);
}

app.use(express.static(resolve(__dirname, '../../public/')));

app.get('/', function (request, response) {
    response.type('html').send(renderClient(store));
});

const appServer = createServer(app);

if (devMode) {
    appServer.on('upgrade', ::proxy.ws);
}

appServer.listen(Ports.appServer, function () {
    console.log(`Application server is running on port ${Ports.appServer}.`);
});

if (devMode) {
    const webpackServer = require('./modules/webpack-server');

    webpackServer.listen(Ports.webpackServer, 'localhost', function () {
        console.log(`Webpack server is running on port ${Ports.webpackServer}.`);
    });
}
