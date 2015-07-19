import * as ActionCreators from './action-creators/counter';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Counter from './components/counter';
import React, {Component, PropTypes} from 'react';

@connect(state => ({counter: state.counter}))
export default class App extends Component {
    render() {
        const {counter, dispatch} = this.props;

        return <Counter counter={counter} {...bindActionCreators(ActionCreators, dispatch)}/>;
    }
}

App.displayName = 'App';

App.propTypes = {
    counter: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired
};
