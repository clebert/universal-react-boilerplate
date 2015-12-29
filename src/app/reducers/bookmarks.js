export default (bookmarks = [], {error, payload, type}) => {
  switch (type) {
    case 'UPDATE_BOOKMARKS': return error ? [] : payload
  }

  return bookmarks
}
