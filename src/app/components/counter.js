import * as ActionCreators from '../actions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import React, {PropTypes} from 'react'

const Counter = props => {
  const {counter, decrementCounter, incrementCounter} = props

  return (
    <div>
      Clicked: {counter} times
      {' '}
      <button onClick={decrementCounter}>-</button>
      {' '}
      <button onClick={incrementCounter}>+</button>
      {' '}
    </div>
  )
}

export default connect(({counter}) => ({counter}), dispatch => {
  return bindActionCreators(ActionCreators, dispatch)
})(Counter)

Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  decrementCounter: PropTypes.func.isRequired,
  incrementCounter: PropTypes.func.isRequired
}
