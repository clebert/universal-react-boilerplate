import * as ActionCreators from 'ActionCreators'
import {bindActionCreators} from 'redux'
import BookmarkList from './BookmarkList'
import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'
import TagList from './TagList'

class Main extends Component {
  static propTypes = {
    deleteBookmarks: PropTypes.func.isRequired,
    updateBookmarks: PropTypes.func.isRequired
  }

  componentWillMount () {
    this.props.deleteBookmarks()
  }

  componentDidMount () {
    this.props.updateBookmarks()
  }

  componentDidUpdate (prevProps) {
    // TODO: get new bookmarks after update...
  }

  render () {
    return (
      <div>
        <BookmarkList/>
        <TagList/>
      </div>
    )
  }
}

export default connect(null, dispatch => {
  return bindActionCreators(ActionCreators, dispatch)
})(Main)
