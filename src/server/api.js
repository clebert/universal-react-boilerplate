export const getBookmarksAsync = async () => {
  const n = Math.random()

  if (n < 1 / 3) {
    return [
      {name: 'Bookmark 1', url: 'http://clebert.io/', tags: ['tag1', 'tag0']},
      {name: 'Bookmark 2', url: 'http://clebert.io/', tags: ['tag2', 'tag1']},
      {name: 'Bookmark 3', url: 'http://clebert.io/', tags: ['tag3', 'tag2']}
    ]
  }

  if (n < 2 / 3) {
    return [
      {name: 'Bookmark 4', url: 'http://clebert.io/', tags: ['tag4', 'tag3']},
      {name: 'Bookmark 5', url: 'http://clebert.io/', tags: ['tag5', 'tag4']},
      {name: 'Bookmark 6', url: 'http://clebert.io/', tags: ['tag6', 'tag5']}
    ]
  }

  throw new Error('something went wrong')
}
