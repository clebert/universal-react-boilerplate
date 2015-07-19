import * as ActionTypes from '../action-types/counter';

export function decrement() {
    return {type: ActionTypes.DECREMENT_COUNTER};
}

export function increment() {
    return {type: ActionTypes.INCREMENT_COUNTER};
}
