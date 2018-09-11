
/* App
 * Main application wrapper
 */

import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Private from './Private'
import Home from './Home'

const App = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route exact path='/private' component={Private} />
  </Switch>
)

export default App
