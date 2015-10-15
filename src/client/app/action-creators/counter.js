import {DECREMENT_COUNTER, INCREMENT_COUNTER} from '../action-types/counter'

export function decrement () {
  return {type: DECREMENT_COUNTER}
}

export function increment () {
  return {type: INCREMENT_COUNTER}
}
