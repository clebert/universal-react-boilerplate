import * as ActionCreators from '../action-creators/counter'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'

function mapStateToProps (state) {
  return {counter: state.counter}
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

@connect(mapStateToProps, mapDispatchToProps)
class Counter extends Component {
  static propTypes = {
    counter: PropTypes.number.isRequired,
    decrement: PropTypes.func.isRequired,
    increment: PropTypes.func.isRequired
  }

  render () {
    const {counter, decrement, increment} = this.props

    return (
      <p>
        Clicked: {counter} times
        {' '}
        <button onClick={decrement}>-</button>
        {' '}
        <button onClick={increment}>+</button>
        {' '}
      </p>
    )
  }
}

export default Counter
