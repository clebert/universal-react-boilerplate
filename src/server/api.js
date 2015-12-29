export const getBookmarksAsync = async () => {
  return Math.random() < 0.5 ? [
    {name: 'Bookmark 1', url: 'http://clebert.io/', tags: ['tag1', 'tag0']},
    {name: 'Bookmark 2', url: 'http://clebert.io/', tags: ['tag2', 'tag1']},
    {name: 'Bookmark 3', url: 'http://clebert.io/', tags: ['tag3', 'tag2']}
  ] : [
    {name: 'Bookmark 4', url: 'http://clebert.io/', tags: ['tag4', 'tag3']},
    {name: 'Bookmark 5', url: 'http://clebert.io/', tags: ['tag5', 'tag4']},
    {name: 'Bookmark 6', url: 'http://clebert.io/', tags: ['tag6', 'tag5']}
  ]
}
