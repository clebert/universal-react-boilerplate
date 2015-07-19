import express from 'express';
import {createServer} from 'http';
import renderClient from './utils/render-client';
import {resolve} from 'path';

const devMode = process.env.NODE_ENV !== 'production';

const port = devMode ? 3000 : 8080;

const app = express();

if (devMode) {
    require('./utils/initialize-webpack')(app);
}

app.use(express.static(resolve(__dirname, '../../public/')));

app.get('/', function (request, response) {
    response.type('html').send(renderClient());
});

const server = createServer(app);

server.listen(port, function () {
    console.log(`Server is running on port ${port}.`);
});
