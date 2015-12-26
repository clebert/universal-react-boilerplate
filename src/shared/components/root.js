import App from './app'
import Counter from './counter'
import {IndexRoute, Route} from 'react-router'
import Oops from './oops'
import React from 'react'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Counter}/>
    <Route path='oops' component={Oops}/>
  </Route>
)
