import * as ActionCreators from 'ActionCreators'
import {bindActionCreators} from 'redux'
import BookmarkList from './BookmarkList'
import bookmarksErrorSelector from '../selectors/bookmarksError'
import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'
import TagList from './TagList'

class Main extends Component {
  static propTypes = {
    bookmarksError: PropTypes.instanceOf(Error),
    deleteBookmarks: PropTypes.func.isRequired,
    invalidateBookmarks: PropTypes.func.isRequired,
    updateBookmarks: PropTypes.func.isRequired
  }

  componentWillMount () {
    this.props.deleteBookmarks()

    this.unmounted = false
  }

  componentDidMount () {
    this.props.updateBookmarks().then(() => {
      if (this.unmounted) {
        this.props.invalidateBookmarks()
      }
    })
  }

  componentDidUpdate (prevProps) {
    // TODO: get new bookmarks after update...
  }

  componentWillReceiveProps ({bookmarksError}) {
    if (bookmarksError) {
      browserHistory.push('/oops')
    }
  }

  componentWillUnmount () {
    this.props.deleteBookmarks()

    this.unmounted = true
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

export default connect(bookmarksErrorSelector, dispatch => {
  return bindActionCreators(ActionCreators, dispatch)
})(Main)
