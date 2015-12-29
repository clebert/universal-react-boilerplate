import App from './components/App'
import {IndexRoute, Route} from 'react-router'
import Main from './components/Main'
import Oops from './components/Oops'
import React from 'react'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Main}/>
    <Route path='oops' component={Oops}/>
  </Route>
)
