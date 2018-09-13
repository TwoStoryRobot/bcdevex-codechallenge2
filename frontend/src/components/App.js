/* App
 * Main application wrapper
 */

import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Home from './Home'
import Logout from './Logout'
import RegisteredUsers from './RegisteredUsers'
import NotFound from './NotFound'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/logout" component={Logout} />
    <PrivateRoute exact path="/users" component={RegisteredUsers} />
    <Route component={NotFound} />
  </Switch>
)

export default App
