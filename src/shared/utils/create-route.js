import App from '../components/app'
import Counter from '../components/counter'
import {IndexRoute, Route} from 'react-router'
import Oops from '../components/oops'
import React from 'react'

export default () => (
  <Route path='/' component={App}>
    <IndexRoute component={Counter}/>
    <Route path='oops' component={Oops}/>
  </Route>
)
