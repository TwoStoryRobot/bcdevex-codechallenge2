
/* Home Page
 * Login and welcome display
 */

import React, { Component } from 'react'
import LoginButton from './LoginButton'

class Home extends Component {

  constructor() {
    super()
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin(profile) {
    const method = 'POST'
    const url ='http://localhost:3500/authenticate'
    const authorization = 'Bearer ' + localStorage.getItem('token')
    const headers = { authorization, 'Content-Type' : "application/json; charset=utf-8" }
    const body = JSON.stringify(profile)
    fetch(url, { method, body, headers })
    .then(() => this.props.history.push('/private'))
  }

  render() {
    return (
      <LoginButton onLogin={profile => this.handleLogin(profile)} />
    )
  }

}

export default Home
