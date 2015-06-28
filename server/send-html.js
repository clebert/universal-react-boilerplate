import App from '../app/components/app.js';
import Baobab from 'baobab';
import ChildProcess from 'child_process';
import compile from 'string-template/compile.js';
import Promise from 'bluebird';
import React from 'react';
import {readFileSync} from 'fs';
import {resolve} from 'path';
import {root} from 'baobab-react/higher-order.js';

const createHtml = compile(readFileSync(resolve(__dirname, '../app/index.html')).toString());
const exec = Promise.promisify(ChildProcess.exec);

const sendHtml = function (request, response) {
    exec('finger $USER | head -n1 | cut -d : -f3').then(function (stdout) {
        const data = {fullName: stdout[0].trim()};
        const tree = new Baobab(data);

        response.type('html').send(createHtml({
            app: React.renderToString(React.createElement(root(App, tree))),
            data: JSON.stringify(data),
            title: 'Isomorphic React Boilerplate'
        }));
    });
};

export default sendHtml;
