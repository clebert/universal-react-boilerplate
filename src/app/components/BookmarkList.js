import * as ActionCreators from 'ActionCreators'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import React, {PropTypes} from 'react'

const Counter = props => {
  const {bookmarks, updateBookmarks} = props

  return (
    <div>
      <ul>
        {bookmarks.map(({name, url}) => (
          <li key={name}>
            <a href={url}>{name}</a>
          </li>
        ))}
      </ul>
      {' '}
      <button onClick={updateBookmarks}>Update</button>
    </div>
  )
}

export default connect(({bookmarks}) => ({bookmarks}), dispatch => {
  return bindActionCreators(ActionCreators, dispatch)
})(Counter)

Counter.propTypes = {
  bookmarks: PropTypes.array.isRequired,
  updateBookmarks: PropTypes.func.isRequired
}
