import Baobab from 'baobab';
import compile from 'string-template/compile.js';
import React from 'react';
import {readFileSync} from 'fs';
import {resolve} from 'path';
import {root} from 'baobab-react/higher-order.js';

const APP_PATH = '../app/components/App.js';

const App = (process.env.NODE_ENV === 'production') ? require(APP_PATH) : null;

const createHtml = compile(readFileSync(resolve(__dirname, '../app/app.html')).toString());

const importApp = function () {
    delete require.cache[resolve(__dirname, APP_PATH)];

    return require(APP_PATH);
};

export const renderApp = function (data) {
    const tree = new Baobab(data);

    return createHtml({
        app: React.renderToString(React.createElement(root(App || importApp(), tree))),
        data: JSON.stringify(data),
        title: 'Isomorphic React Boilerplate'
    });
};
