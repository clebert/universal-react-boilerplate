import {combineReducers, createStore} from 'redux';
import {v4 as createUuid} from 'node-uuid';
import * as Reducers from '../../app/reducers';

export default function (io) {
    const store = createStore(combineReducers(Reducers));

    // TODO: dispatch saved actions...

    Object.keys(Reducers).filter(function (key) {
        return !key.startsWith('_');
    }).forEach(function (key) {
        const reducerIo = io.of(`/${key}`);

        let token = createUuid();

        reducerIo.on('connection', function (socket) {
            reducerIo.emit('token', token);

            socket.on('store', function (request, callback) {
                if (request.token === token) {
                    const {action} = request;

                    // TODO: validate and save action...

                    store.dispatch(action);

                    callback(action);

                    reducerIo.emit('token', token = createUuid());
                } else {
                    callback({});

                    reducerIo.emit('token', token);
                }
            });
        });
    });

    return {store};
}
