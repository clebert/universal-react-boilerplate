import * as ActionCreators from 'ActionCreators'
import {bindActionCreators} from 'redux'
import bookmarksSelector from '../selectors/bookmarks'
import {connect} from 'react-redux'
import React, {PropTypes} from 'react'

const Counter = props => {
  const {bookmarks, updateBookmarks} = props

  return (
    <div>
      <h2>Bookmarks</h2>

      <button onClick={updateBookmarks}>Update</button>

      <ul>
        {bookmarks.map(({name, url}) => (
          <li key={name}>
            <a href={url}>{name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default connect(bookmarksSelector, dispatch => {
  return bindActionCreators(ActionCreators, dispatch)
})(Counter)

Counter.propTypes = {
  bookmarks: PropTypes.array.isRequired,
  updateBookmarks: PropTypes.func.isRequired
}
