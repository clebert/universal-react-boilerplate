import * as ActionCreators from 'ActionCreators'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import React, {PropTypes} from 'react'
import tagsSelector from '../selectors/tags'

const TagList = props => {
  const {tags} = props

  return (
    <div>
      <h2>Tags</h2>

      <ul>
        {tags.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </div>
  )
}

export default connect(tagsSelector, dispatch => {
  return bindActionCreators(ActionCreators, dispatch)
})(TagList)

TagList.propTypes = {
  tags: PropTypes.array.isRequired
}
