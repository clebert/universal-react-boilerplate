import bookmarksReducer from './reducers/bookmarks'
import {combineReducers} from 'redux'
import errorReducer from './reducers/error'
import {routeReducer} from 'redux-simple-router'

export default combineReducers({
  bookmarks: bookmarksReducer,
  error: errorReducer,
  routing: routeReducer
})
