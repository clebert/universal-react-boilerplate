import Hello from './hello.jsx';
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
