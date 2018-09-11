
/* User Context
 * React context object that represents the active user
 */

import React, { Component } from 'react'

const UserContext = React.createContext({})
const UserConsumer = UserContext.Consumer

class UserProvider extends Component {

  constructor() {
    super()
    const isLoggedIn = localStorage.getItem('token')
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.state = { isLoggedIn }
  }

  login(auth) {
    const isLoggedIn = true
    const token = auth.getAuthResponse().id_token
    localStorage.setItem('token', token)
    this.setState({ isLoggedIn })
  }

  logout() {
    const isLoggedIn = false
    this.setState({ isLoggedIn })
  }

  render() {
    return (
      <UserContext.Provider value={{
        isLoggedIn: this.state.isLoggedIn,
        logout: this.logout,
        login: this.login
      }}>
        {this.props.children}
      </UserContext.Provider>
    )
  }

}

export { UserProvider, UserConsumer }
