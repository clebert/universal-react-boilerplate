export const getBookmarksAsync = async () => {
  const n = Math.random()

  if (n < 1 / 3) {
    return [
      {name: 'GitHub', url: 'https://github.com/'},
      {name: 'Twitter', url: 'https://twitter.com/'},
      {name: 'Flickr', url: 'https://www.flickr.com/'}
    ]
  }

  if (n < 2 / 3) {
    return [
      {name: 'Google', url: 'https://www.google.com'},
      {name: 'Bing', url: 'https://www.bing.com/'},
      {name: 'Yahoo', url: 'https://search.yahoo.com/'}
    ]
  }

  throw new Error('something went wrong')
}
