export default (bookmarksError = null, {error, payload, type}) => {
  switch (type) {
    case 'DELETE_BOOKMARKS': return null
    case 'INVALIDATE_BOOKMARKS': return new Error('invalid bookmarks')
    case 'UPDATE_BOOKMARKS': return error ? payload : null
  }

  return bookmarksError
}
