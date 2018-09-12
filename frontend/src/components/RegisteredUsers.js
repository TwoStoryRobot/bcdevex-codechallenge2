/* Registered User Page
 * Page to display list of registered users, search field, and app bar
 */

import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { UserConsumer } from './UserContext'
import AppBar from './AppBar'
import UserTable from './UserTable'
import { getDefaultHeaders } from '../requests.js'

const Container = styled.div`
  padding-top: 64px;
`

const Content = styled.div`
  width: 900px;
  max-width: calc(100vw - 100px);
  margin: auto;
`

class RegisteredUsers extends React.Component {
  state = {
    isLoadingUsers: false,
    currentUser: undefined,
    users: [],
    controller: new window.AbortController()
  }

  componentDidMount() {
    //  Signal used to cancel any pending requests when component unmounts
    const { signal } = this.state.controller
    const method = 'GET'
    const headers = getDefaultHeaders()

    //  Fetch all users
    this.setState({ isLoadingUsers: true })
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
        this.setState({ users, currentUser, isLoadingUsers: false })
      })
  }

  componentWillUnmount() {
    this.state.controller.abort()
  }

  render() {
    const { currentUser, users, isLoadingUsers } = this.state
    const avatar = currentUser && currentUser.imageURL
    const name =
      currentUser && `${currentUser.firstName} ${currentUser.lastName}`

    return (
      <UserConsumer>
        {({ logout }) => (
          <Container>
            <AppBar
              title="Registered Users"
              {...{ avatar, name }}
              onSignOut={logout}
            />
            <Content>
              <UserTable users={users} isLoading={isLoadingUsers} />
            </Content>
          </Container>
        )}
      </UserConsumer>
    )
  }
}

RegisteredUsers.propTypes = {
  userId: PropTypes.string
}

export default RegisteredUsers
