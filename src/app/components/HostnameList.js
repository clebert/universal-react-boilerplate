import * as ActionCreators from 'ActionCreators'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import hostnamesSelector from '../selectors/hostnames'
import React, {PropTypes} from 'react'

const HostnameList = props => {
  const {hostnames} = props

  return (
    <div>
      <h2>Hostnames</h2>

      <ul>
        {hostnames.map(hostname => (
          <li key={hostname}>{hostname}</li>
        ))}
      </ul>
    </div>
  )
}

export default connect(hostnamesSelector, dispatch => {
  return bindActionCreators(ActionCreators, dispatch)
})(HostnameList)

HostnameList.propTypes = {
  hostnames: PropTypes.array.isRequired
}
