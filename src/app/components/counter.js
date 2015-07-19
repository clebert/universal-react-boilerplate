import React, {Component, PropTypes} from 'react';

export default class Counter extends Component {
    render() {
        const {counter, decrement, increment} = this.props;

        return (
            <p>
                Clicked: {counter} times
                {' '}
                <button onClick={decrement}>-</button>
                {' '}
                <button onClick={increment}>+</button>
            </p>
        );
    }
}

Counter.displayName = 'Counter';

Counter.propTypes = {
    counter: PropTypes.number.isRequired,
    decrement: PropTypes.func.isRequired,
    increment: PropTypes.func.isRequired
};
