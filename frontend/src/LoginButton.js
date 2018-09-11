
/* LoginButton
 * Button to trigger Google Login flow
 */

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import GoogleLogin from 'react-google-login'
import { UserConsumer } from './UserContext'

class LoginButton extends Component {

  constructor() {
    super()
    this.handleLogin = this.handleLogin.bind(this)
    this.handleFailure = this.handleFailure.bind(this)
  }

  mapProfile(googleUser) {
    const profile = googleUser.getBasicProfile()
    return {
      userId : profile.getId(),
      firstName : profile.getGivenName(),
      lastName : profile.getFamilyName(),
      emailAddress : profile.getEmail(),
      imageUrl : profile.getImageUrl()
    }
  }

  handleLogin(addLoginToContext, googleUser) {
    addLoginToContext(googleUser)
    const profile = this.mapProfile(googleUser)
    this.props.onLogin(profile)
  }

  handleFailure(err) {
    const error = new Error(err.error)
    this.props.onFailure(error)
  }

  render() {
    return (
      <UserConsumer>
        {({ login, logout }) => (
          <GoogleLogin
            buttonText="Login"
            clientId={process.env.REACT_APP_CLIENT_ID}
            onSuccess={googleUser => this.handleLogin(login, googleUser)}
            onFailure={err => this.handleFailure(err)}
          />
        )}
      </UserConsumer>
    )
  }

}

LoginButton.propTypes = {
  onLogin: PropTypes.func,
  onFailure: PropTypes.func
}

export default LoginButton
