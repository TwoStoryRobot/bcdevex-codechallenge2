
/* LoginButton
 * Button to trigger Google Login flow
 */

import React, { Component } from 'react'
import { UserConsumer } from './UserContext'
import GoogleLogin from 'react-google-login'

class LoginButton extends Component {

  render() {
    return (
      <UserConsumer>
        {({ login, logout }) => (
          <GoogleLogin
            clientId="656587629888-4rvd0pv398dgderln9s6kuvr7kdn99k5.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={login}
            onFailure={logout}
          />
        )}
      </UserConsumer>
    )
  }

}

export default LoginButton
