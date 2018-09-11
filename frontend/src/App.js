
/* App
 * Main application wrapper
 */

import React, { Component } from 'react'
import { UserProvider } from './UserContext'
import LoginButton from './LoginButton'

class App extends Component {

  render() {
    return (
      <UserProvider> 
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
        <LoginButton />
      </UserProvider>
    )
  }

}

export default App
