import bookmarksReducer from './reducers/bookmarks'
import {combineReducers} from 'redux'
import errorReducer from './reducers/error'

export default combineReducers({
  bookmarks: bookmarksReducer,
  error: errorReducer
})
