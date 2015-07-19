import App from '../app';
import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import React from 'react';
import * as Reducers from '../app/reducers';

const store = createStore(combineReducers(Reducers), window.initialState);

React.render((
    <Provider store={store}>
        {function () {
            return <App/>;
        }}
    </Provider>
), document.querySelector('main'));
