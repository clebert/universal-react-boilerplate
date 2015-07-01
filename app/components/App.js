import Hello from './Hello.js';
import React, {Component} from 'react';

export default class App extends Component {
    render() {
        return (
            <div className="container-fluid">
                <Hello/>
            </div>
        );
    }
}

App.displayName = 'App';
