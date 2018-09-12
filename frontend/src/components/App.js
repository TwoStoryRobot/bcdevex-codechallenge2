/* App
 * Main application wrapper
 */

import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Home from './Home'
import UserListPage from './UserListPage'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <PrivateRoute exact path="/users" component={UserListPage} />
  </Switch>
)

export default App
