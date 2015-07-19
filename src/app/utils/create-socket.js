/* globals io: false, location: false */

export default function (namespace) {
    if (typeof io === 'undefined' || typeof location === 'undefined') {
        return null;
    }

    const socket = io.connect(`${location.protocol}//${location.host}${namespace}`);

    let token;

    socket.on('token', function (latestToken) {
        token = latestToken;
    });

    function store(action, dispatch) {
        socket.emit('store', {action, token}, function (response) {
            if (response.error) {
                dispatch({}); // TODO: improve error handling...
            } else {
                dispatch(response.action);
            }
        });
    }

    return {store};
}
