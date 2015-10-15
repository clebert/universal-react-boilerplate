import {DECREMENT_COUNTER, INCREMENT_COUNTER} from '../action-types/counter'

export default function (counter = 0, action) {
  if (action.type === DECREMENT_COUNTER) {
    return counter - 1
  }

  if (action.type === INCREMENT_COUNTER) {
    return counter + 1
  }

  return counter
}
