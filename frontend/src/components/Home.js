
/* Home Page
 * Login and welcome display
 */

import React, { Component } from 'react'
import LoginButton from './LoginButton'
import { authenticate } from '../requests'

class Home extends Component {

  handleLogin = profile => {
    authenticate(profile)
    .then(() => this.props.history.push('/private'))
  }

  handleError = err => {
    console.error(err.message)
  }

  render() {
    return (
      <LoginButton 
        onLogin={profile => this.handleLogin(profile)} 
        onFailure={err => this.handleError(err)} 
      />
    )
  }

}

export default Home
