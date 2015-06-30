import {branch} from 'baobab-react/higher-order.js';
import React, {Component} from 'react';

class Hello extends Component {
    render() {
        return (
            <span>Hello {this.props.fullName}!</span>
        );
    }
}

Hello.displayName = 'Hello';

export default branch(Hello, {
    cursors: {
        fullName: ['fullName']
    }
});
