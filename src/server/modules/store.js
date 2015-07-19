import {combineReducers, createStore} from 'redux';
import * as Reducers from '../../app/reducers';

const initialState = {counter: 30};

export default createStore(combineReducers(Reducers), initialState);
