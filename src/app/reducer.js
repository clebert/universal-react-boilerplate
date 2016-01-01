import bookmarksErrorReducer from './reducers/bookmarksError'
import bookmarksReducer from './reducers/bookmarks'
import {combineReducers} from 'redux'

export default combineReducers({
  bookmarks: bookmarksReducer,
  bookmarksError: bookmarksErrorReducer
})
