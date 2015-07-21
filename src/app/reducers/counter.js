import * as ActionTypes from '../action-types/counter';

function decrement(counter) {
    return counter - 1;
}

function increment(counter) {
    return counter + 1;
}

export default function (counter = 0, action) {
    switch (action.type) {
        case ActionTypes.decrement: return decrement(counter);
        case ActionTypes.increment: return increment(counter);
    }

    return counter;
}
