/* Home Page
 * Login and welcome display
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LoginButton from './LoginButton'
import styled from 'styled-components'
import { authenticate } from '../requests'
import { Typography } from '@material-ui/core'
import { withAuthContext } from './AuthContext'

import background from '../images/background.jpeg'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
  overflow: none;
  padding: 0;
  margin: 0;

  background-image: url('${background}');
  background-size: cover;
`

const Transparency = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr;
  grid-row-gap: 15px

  background-color: rgba(0, 0, 0, 0.64);
  color: #fff;

  padding: 25px 31px;
  border-radius: 5px;
`

const IntroText = styled(Typography)`
  grid-column: 0;
  && {
    color: #fff;
    font-weight: 300;
    font-size: 16px;
    margin-bottom: 17px;
  }
`

const ButtonContainer = styled.div`
  grid-column: 1;
  place-self: center;
`

class Home extends Component {
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.history.push('/users')
    }
  }

  handleLogin = async profile => {
    await authenticate(profile)
    this.props.history.push('/users')
  }

  handleError = err => {
    console.error(err.message)
  }

  render() {
    return (
      <Container>
        <Transparency>
          <IntroText variant="subheading" component="p">
            Manage users, send them emails!
          </IntroText>
          <ButtonContainer>
            <LoginButton
              onLogin={profile => this.handleLogin(profile)}
              onFailure={err => this.handleError(err)}
            />
          </ButtonContainer>
        </Transparency>
      </Container>
    )
  }
}

Home.propTypes = {
  isLoggedIn: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

export default withAuthContext(Home)
