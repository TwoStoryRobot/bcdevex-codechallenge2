
/* LoginButton
 * Button to trigger Google Login flow
 */

import React, { Component } from 'react'
import { UserConsumer } from './UserContext'
import GoogleLogin from 'react-google-login'

class LoginButton extends Component {

  constructor() {
    super()
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin(loginFunction, profile) {
    loginFunction(profile)
    this.props.onLogin(profile)
  }

  render() {
    return (
      <UserConsumer>
        {({ login, logout }) => (
          <GoogleLogin
            buttonText="Login"
            clientId="656587629888-4rvd0pv398dgderln9s6kuvr7kdn99k5.apps.googleusercontent.com"
            onSuccess={profile => this.handleLogin(login, profile)}
            onFailure={logout}
          />
        )}
      </UserConsumer>
    )
  }

}

export default LoginButton
