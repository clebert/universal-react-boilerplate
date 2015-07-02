import App from '../app/App.jsx';
import Baobab from 'baobab';
import React from 'react';
import {root} from 'baobab-react/higher-order.js';

const tree = new Baobab(window.data);

delete window.data;

React.render(React.createElement(root(App, tree)), document.querySelector('main'));
