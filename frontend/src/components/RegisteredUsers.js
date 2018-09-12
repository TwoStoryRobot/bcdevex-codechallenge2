/* Registered User Page
 * Page to display list of registered users, search field, and app bar
 */

import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { UserConsumer } from './UserContext'
import AppBar from './AppBar'
import UserTable from './UserTable'
import { getUsers } from '../requests.js'

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
    isFetchingUsers: false,
    currentUser: undefined,
    users: [],
    fetchUsersController: undefined
  }

  componentDidMount() {
    //  Fetch all users
    this.setState({ isFetchingUsers: true })
    getUsers().then(({ users, controller }) => {
      const currentUser = users.find(user => user.userId === this.props.userId)
      this.setState({
        users,
        currentUser,
        isFetchingUsers: false,
        fetchUsersController: controller
      })
    })
  }

  componentWillUnmount() {
    const { fetchUsersController } = this.state
    fetchUsersController && fetchUsersController.abort()
  }

  //  TODO: Implement this function
  handleUserEditClick() {
    console.log('Edit User Clicked')
  }

  //  TODO: Implement this function
  handleUserDeleteClick() {
    console.log('Delete User Clicked')
  }

  //  TODO: Implement this function
  handleUserSendEmailClick() {
    console.log('Send User Email Clicked')
  }

  render() {
    const { currentUser, users, isFetchingUsers } = this.state
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
              <UserTable
                users={users}
                isLoading={isFetchingUsers}
                isAdmin={currentUser && !currentUser.isAdmin}
                handleEditClick={this.handleUserEditClick}
                handleDeleteClick={this.handleUserDeleteClick}
                handleSendEmailClick={this.handleUserSendEmailClick}
              />
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
