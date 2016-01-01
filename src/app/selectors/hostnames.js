import bookmarksSelector from './bookmarks'
import {createSelector} from 'reselect'
import parseUrl from 'url-parse'
import unique from 'lodash/array/unique'

export default createSelector(bookmarksSelector, ({bookmarks}) => {
  return {
    hostnames: unique(bookmarks.reduce((hostnames, {url}) => {
      return [...hostnames, parseUrl(url, true).hostname]
    }, []))
  }
})
