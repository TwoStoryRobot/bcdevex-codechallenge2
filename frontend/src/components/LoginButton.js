
/* LoginButton
 * Button to trigger Google Login flow
 */

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import GoogleLogin from 'react-google-login'
import Button from '@material-ui/core/Button'
import AccountIcon from 'mdi-react/AccountIcon'
import { withTheme } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey';
import styled from 'styled-components'
import { UserConsumer } from './UserContext'

const StyledAccountIcon = styled(AccountIcon)`
  margin-right: ${({ theme }) => theme.spacing.unit}px;
`

const StyledButton = styled(Button)`
  && {
    text-transform: none;
    width: 200px;
    background-color: #fff;
    color: ${grey[600]};
  }
`

class LoginButton extends Component {

  mapProfile(googleUser) {
    const profile = googleUser.getBasicProfile()
    return {
      userId : profile.getId(),
      firstName : profile.getGivenName(),
      lastName : profile.getFamilyName(),
      emailAddress : profile.getEmail(),
      imageURL : profile.getImageUrl()
    }
  }

  handleLogin = (addLoginToContext, googleUser) => {
    const profile = this.mapProfile(googleUser)
    addLoginToContext(googleUser)
    this.props.onLogin(profile)
  }

  handleFailure = err => {
    const error = new Error(err.error)
    this.props.onFailure(error)
  }

  render() {
    return (
      <UserConsumer>
        {({ login }) => (
          <GoogleLogin
            buttonText="Login"
            clientId={process.env.REACT_APP_CLIENT_ID}
            onSuccess={googleUser => this.handleLogin(login, googleUser)}
            onFailure={err => this.handleFailure(err)}
            render={({ onClick }) => 
              <StyledButton onClick={onClick} variant="raised">
                <StyledAccountIcon theme={this.props.theme} />
                Sign in with Google
              </StyledButton>
            }
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

export default withTheme()(LoginButton)
