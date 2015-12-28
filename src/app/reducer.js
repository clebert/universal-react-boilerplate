import {combineReducers} from 'redux'
import counter from './reducers/counter'
import {routeReducer} from 'redux-simple-router'

export default combineReducers({
  counter,
  routing: routeReducer
})
