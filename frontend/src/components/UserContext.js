/* User Context
 * React context object that represents the active user
 */

import React, { Component } from 'react'

const UserContext = React.createContext({})
const UserConsumer = UserContext.Consumer

class UserProvider extends Component {
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
      <UserContext.Provider
        value={{
          userId: this.state.userId,
          isLoggedIn: this.state.isLoggedIn,
          logout: this.logout,
          login: this.login
        }}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

const withUserContext = Component => props => (
  <UserConsumer>
    {userProps => <Component {...props} {...userProps} />}
  </UserConsumer>
)

export { UserProvider, UserConsumer, withUserContext }
