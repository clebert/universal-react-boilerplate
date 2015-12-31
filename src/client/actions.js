import {createAction} from 'redux-actions'
import {requestJsonAsync} from './utils'

export const deleteBookmarks = createAction('DELETE_BOOKMARKS')

export const updateBookmarks = createAction('UPDATE_BOOKMARKS', async () => {
  return await requestJsonAsync('/api/getBookmarks')
})
