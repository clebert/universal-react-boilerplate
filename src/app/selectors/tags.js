import bookmarksSelector from './bookmarks'
import {createSelector} from 'reselect'
import unique from 'lodash/array/unique'

export default createSelector(bookmarksSelector, ({bookmarks}) => {
  return {
    tags: unique(bookmarks.reduce((tags, bookmark) => {
      return [...tags, ...bookmark.tags]
    }, []).sort())
  }
})
