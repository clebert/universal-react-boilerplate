import * as ActionCreators from 'ActionCreators'
import {bindActionCreators} from 'redux'
import BookmarkList from './BookmarkList'
import bookmarksErrorSelector from '../selectors/bookmarksError'
import {connect} from 'react-redux'
import HostnameList from './HostnameList'
import React, {Component, PropTypes} from 'react'

class Main extends Component {
  static propTypes = {
    bookmarksError: PropTypes.instanceOf(Error),
    deleteBookmarks: PropTypes.func.isRequired,
    invalidateBookmarks: PropTypes.func.isRequired,
    pushPath: PropTypes.func.isRequired,
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
      this.props.pushPath('/oops')
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
        <HostnameList/>
      </div>
    )
  }
}

export default connect(bookmarksErrorSelector, dispatch => {
  return bindActionCreators(ActionCreators, dispatch)
})(Main)
