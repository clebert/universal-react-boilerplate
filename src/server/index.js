import createActionLog from './utils/create-action-log';
import createIo from 'socket.io';
import {createServer} from 'http';
import express from 'express';
import renderClient from './utils/render-client';
import {resolve} from 'path';

const app = express();
const server = createServer(app);

const devMode = process.env.NODE_ENV !== 'production';

if (devMode) {
    require('./utils/setup-webpack')(app);
}

app.use(express.static(resolve(__dirname, '../../public/')));

const actionLog = createActionLog(createIo(server));

app.get('/', function (request, response) {
    response.type('html').send(renderClient(actionLog.store));
});

const port = devMode ? 3000 : 8080;

server.listen(port, function () {
    console.log(`Server is running on port ${port}.`);
});
