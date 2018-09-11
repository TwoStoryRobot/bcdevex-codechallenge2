
/* App
 * Main application wrapper
 */

import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Private from './Private'
import Home from './Home'

const App = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <PrivateRoute exact path='/private' component={Private} />
  </Switch>
)

export default App
