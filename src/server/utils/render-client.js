import App from '../../app';
import compile from 'string-template/compile';
import {Provider} from 'react-redux';
import React from 'react';
import {readFileSync} from 'fs';
import {resolve} from 'path';

const createHtml = compile(readFileSync(resolve(__dirname, '../../client/index.html')).toString());

export default function (store) {
    return createHtml({
        app: React.renderToString((
            <Provider store={store}>
                {function () {
                    return <App/>;
                }}
            </Provider>
        )),
        initialState: JSON.stringify(store.getState()),
        title: 'Universal React Boilerplate'
    });
}
