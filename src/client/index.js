import App from '../app';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import React from 'react';
import * as Reducers from '../app/reducers';
import thunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const store = createStoreWithMiddleware(combineReducers(Reducers), window.initialState);

React.render(<Provider store={store}>{function () {
    return <App/>;
}}</Provider>, document.querySelector('main'));
