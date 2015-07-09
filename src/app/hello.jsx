import {branch} from 'baobab-react/higher-order.js';
import Input from 'react-bootstrap/lib/Input.js';
import Panel from 'react-bootstrap/lib/Panel.js';
import propTypes from 'baobab-react/prop-types.js';
import React, {Component} from 'react';

const handleChange = function (context, event) {
    context.cursors.fullName.set(event.target.value);

    context.tree.commit();
};

class Hello extends Component {
    constructor() {
        super();

        this.handleChange = (event) => handleChange(this.context, event);
    }

    render() {
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-6">
                    <div className="row">
                        <div className="col-xs-12">
                            <Input bsStyle={this.props.fullName.length ? 'success' : 'error'}
                                hasFeedback
                                label="Full name"
                                onChange={this.handleChange}
                                placeholder="Enter your full name"
                                ref="input"
                                type="text"
                                value={this.props.fullName}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <Panel bsStyle={this.props.fullName.length ? 'success' : 'danger'}>Hello {this.props.fullName}!</Panel>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Hello.contextTypes = {cursors: propTypes.cursors, tree: propTypes.baobab};

Hello.displayName = 'Hello';

export default branch(Hello, {
    cursors: {
        fullName: ['fullName']
    }
});
