import Hello from './Hello.js';
import React, {Component} from 'react';

export default class App extends Component {
    render() {
        return (
            <Hello/>
        );
    }
}

App.displayName = 'App';
