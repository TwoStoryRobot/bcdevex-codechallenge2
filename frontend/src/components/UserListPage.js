/* User List Page
 * Page to display list of active users, search field, and app bar
 */

import React from 'react'
import styled from 'styled-components'
import { UserConsumer } from './UserContext'
import AppBar from './AppBar'
import { getDefaultHeaders } from '../requests.js'

const Container = styled.div`
  padding-top: 64px;
`

class UserListPage extends React.Component {
  state = {
    currentUser: undefined,
    users: [],
    controller: new window.AbortController()
  }

  componentDidMount() {
    //  Signal used to cancel any pending requests when component unmounts
    const { signal } = this.state.controller
    const method = 'GET'
    const headers = getDefaultHeaders()

    Promise.all([
      //  Fetch all users
      fetch(process.env.REACT_APP_API_URL + 'fetch', {
        method,
        headers,
        signal
      }).then(res => res.json()),

      //  TODO: Fetch current user from DB (See #84)
      //  Fetch current logged in user
      Promise.resolve({
        userId: '104971212562092916943',
        firstName: 'Chad',
        imageURL:
          'https://lh5.googleusercontent.com/-CZCghI5fZkI/AAAAAAAAAAI/AAAAAAAAAA4/JLhrIPGYesI/s96-c/photo.jpg',
        emailAddress: 'chad.fawcett@twostoryrobot.com',
        lastName: 'Fawcett'
      })
    ]).then(([users, currentUser]) => this.setState({ users, currentUser }))
  }

  componentWillUnmount() {
    this.state.controller.abort()
  }

  render() {
    return (
      <UserConsumer>
        {({ logout }) => (
          <Container>
            <AppBar />
            <button onClick={logout}>Logout</button>
          </Container>
        )}
      </UserConsumer>
    )
  }
}

export default UserListPage
