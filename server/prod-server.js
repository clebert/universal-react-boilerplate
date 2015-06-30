import {APP_PROD_SERVER_PORT} from './config.js';
import {createServer} from 'http';
import express from 'express';
import {loadData} from './store.js';
import {renderApp} from './renderer.js';
import {resolve} from 'path';

const app = express();

app.use(express.static(resolve(__dirname, '../public/')));

app.get('/', function (request, response) {
    loadData().then(function (data) {
        response.type('html').send(renderApp(data));
    });
});

const appServer = createServer(app);

appServer.listen(APP_PROD_SERVER_PORT, function () {
    console.log(`Application server is running on port ${APP_PROD_SERVER_PORT}.`);
});
