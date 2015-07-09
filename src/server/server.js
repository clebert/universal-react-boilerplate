import {APP_SERVER_ICON, APP_SERVER_PORT} from '../resources/server.config.js';
import {createServer} from 'http';
import express from 'express';
import {renderApp} from './renderer.js';
import {resolve} from 'path';

const app = express();

app.use(express.static(resolve(__dirname, '../../public/')));

app.get('/', function (request, response) {
    response.type('html').send(renderApp({fullName: 'John Doe'}));
});

const appServer = createServer(app);

appServer.listen(APP_SERVER_PORT, function () {
    console.log(`${APP_SERVER_ICON}  Application server is running on port ${APP_SERVER_PORT}.`);
});
