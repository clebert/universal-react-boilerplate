import isEqual from 'lodash/lang/isEqual'

export default (bookmarks = [], {error, payload, type}) => {
  switch (type) {
    case 'DELETE_BOOKMARKS': return []
    case 'UPDATE_BOOKMARKS': return error ? [] : (
      isEqual(payload, bookmarks) ? bookmarks : payload
    )
  }

  return bookmarks
}
