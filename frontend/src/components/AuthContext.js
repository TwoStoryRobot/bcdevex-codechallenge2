/* Auth Context
 * React context object that represents the active user
 */

import React, { Component } from 'react'

const AuthContext = React.createContext({})
const AuthConsumer = AuthContext.Consumer

class AuthProvider extends Component {
  state = {
    isLoggedIn: localStorage.getItem('token'),
    userId: localStorage.getItem('userId')
  }

  login = auth => {
    const isLoggedIn = true
    const token = auth.getAuthResponse().id_token
    const userId = auth.getBasicProfile().getId()
    localStorage.setItem('token', token)
    localStorage.setItem('userId', userId)
    this.setState({ isLoggedIn, userId })
  }

  logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    const isLoggedIn = false
    this.setState({ isLoggedIn })
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          userId: this.state.userId,
          isLoggedIn: this.state.isLoggedIn,
          logout: this.logout,
          login: this.login
        }}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

const withAuthContext = Component => props => (
  <AuthConsumer>
    {authProps => <Component {...props} {...authProps} />}
  </AuthConsumer>
)

export { AuthProvider, AuthConsumer, withAuthContext }
