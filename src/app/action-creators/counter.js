import * as ActionTypes from '../action-types/counter';
import createSocket from '../utils/create-socket';

const socket = createSocket('/counter');

export function decrement() {
    const action = {type: ActionTypes.decrement};

    return function (dispatch) {
        socket.store(action, dispatch);
    };
}

export function increment() {
    const action = {type: ActionTypes.increment};

    return function (dispatch) {
        socket.store(action, dispatch);
    };
}
