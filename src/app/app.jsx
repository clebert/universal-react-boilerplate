import Hello from './hello.jsx';
import Label from 'react-bootstrap/lib/Label.js';
import React, {Component} from 'react';

export default class App extends Component {
    render() {
        return (
            <div className="container-fluid">
                <Hello/>

                <div className="row">
                    <div className="col-xs-12">
                        <Label bsStyle="info">Powered by <a href="https://github.com/clebert/universal-react-boilerplate">Universal React Boilerplate</a></Label>
                    </div>
                </div>
            </div>
        );
    }
}

App.displayName = 'App';
