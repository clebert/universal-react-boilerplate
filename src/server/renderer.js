import Baobab from 'baobab';
import compile from 'string-template/compile.js';
import React from 'react';
import {readFileSync} from 'fs';
import {resolve} from 'path';
import {root} from 'baobab-react/higher-order.js';

const appPath = '../app/App.jsx';

const App = (process.env.NODE_ENV === 'production') ? require(appPath) : null;

const createHtml = compile(readFileSync(resolve(__dirname, '../resources/client.html')).toString());

const importApp = function () {
    Object.keys(require.cache).filter(function (key) {
        return (/\/src\/app\/[A-Za-z]+\.jsx$/).test(key);
    }).forEach(function (key) {
        delete require.cache[key];
    });

    return require(appPath);
};

export const renderApp = function (data) {
    const tree = new Baobab(data);

    return createHtml({
        app: React.renderToString(React.createElement(root(App || importApp(), tree))),
        data: JSON.stringify(data),
        title: 'Isomorphic React Boilerplate'
    });
};
