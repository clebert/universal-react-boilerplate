import App from './components/App'
import BookmarkList from './components/BookmarkList'
import {IndexRoute, Route} from 'react-router'
import Oops from './components/Oops'
import React from 'react'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={BookmarkList}/>
    <Route path='oops' component={Oops}/>
  </Route>
)
