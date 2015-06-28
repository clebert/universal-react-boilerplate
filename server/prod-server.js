import {APP_PROD_SERVER_PORT} from './config.js';
import {createServer} from 'http';
import express from 'express';
import {resolve} from 'path';
import sendHtml from './send-html.js';

const app = express();

app.use(express.static(resolve(__dirname, '../public/')));

app.get('/', sendHtml);

const appServer = createServer(app);

appServer.listen(APP_PROD_SERVER_PORT, function () {
    console.log(`Application server is running on port ${APP_PROD_SERVER_PORT}.`);
});
