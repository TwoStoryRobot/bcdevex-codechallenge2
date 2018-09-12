/* User List Page
 * Page to display list of active users, search field, and app bar
 */

import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { UserConsumer } from './UserContext'
import AppBar from './AppBar'
import { getDefaultHeaders } from '../requests.js'

const Container = styled.div`
  padding-top: 64px;
`

class UserListPage extends React.Component {
  state = {
    currentUser: {},
    users: [],
    controller: new window.AbortController()
  }

  componentDidMount() {
    //  Signal used to cancel any pending requests when component unmounts
    const { signal } = this.state.controller
    const method = 'GET'
    const headers = getDefaultHeaders()

    //  Fetch all users
    fetch(process.env.REACT_APP_API_URL + 'fetch', {
      method,
      headers,
      signal
    })
      .then(res => res.json())
      .then(users => {
        const currentUser = users.find(
          user => user.userId === this.props.userId
        )
        this.setState({ users, currentUser })
      })
  }

  componentWillUnmount() {
    this.state.controller.abort()
  }

  render() {
    const { currentUser } = this.state
    const avatar = currentUser.imageURL
    const name = `${currentUser.firstName} ${currentUser.lastName}`

    return (
      <UserConsumer>
        {({ logout }) => (
          <Container>
            <AppBar
              title="Registered Users"
              {...{ avatar, name }}
              onSignOut={logout}
            />
          </Container>
        )}
      </UserConsumer>
    )
  }
}

UserListPage.propTypes = {
  userId: PropTypes.string
}

export default UserListPage
