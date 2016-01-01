import bookmarksErrorReducer from './reducers/bookmarksError'
import bookmarksReducer from './reducers/bookmarks'
import {combineReducers} from 'redux'
import {routeReducer} from 'redux-simple-router'

export default combineReducers({
  bookmarks: bookmarksReducer,
  bookmarksError: bookmarksErrorReducer,
  routing: routeReducer
})
