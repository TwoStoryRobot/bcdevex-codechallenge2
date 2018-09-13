/* Registered User Page
 * Page to display list of registered users, search field, and app bar
 */

import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { UserConsumer } from './UserContext'
import AppBar from './AppBar'
import UserTable from './UserTable'
import EditUserDialog from './EditUserDialog'
import { getUsers, updateUser } from '../requests.js'

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
    fetchUsersController: undefined,
    editing: false,
    editingUser: {
      firstName: null,
      lastName: null,
      emailAddress: null,
      imageURL: null,
      userId: null
    },
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

  handleUserEditClick = user => {
    this.setState({ editingUser: user, editing: true })
  }

  handleEditCurrentUser = () => {
    this.setState({ editingUser: this.state.currentUser, editing: true })
  }

  handleEditDialogClose = () => {
    this.setState({ editing: false })
  }

  handleEditDialogSave = async updatedUser => {
    const oldUser = this.state.users.find(user => user.userId === updatedUser.userId)
    
    // Just in case user has properties that aren't passed to EditUserDialog
    const mergedUser = {
      ...oldUser,
      ...updatedUser
    }

    const { userId } = mergedUser

    this.setState({
      users: this.state.users.map(user => user.userId === userId ? mergedUser : user),
      currentUser: this.state.currentUser.userId === userId ? mergedUser : this.state.currentUser
    })

    updateUser(mergedUser)

    this.handleEditDialogClose()
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
          <React.Fragment>
            <Container>
              <AppBar
                title="Registered Users"
                {...{ avatar, name }}
                onSignOut={logout}
                onEdit={this.handleEditCurrentUser}
              />
              <Content>
                <UserTable
                  users={users}
                  isLoading={isFetchingUsers}
                  isAdmin={currentUser && currentUser.isAdmin}
                  handleEditClick={this.handleUserEditClick}
                  handleDeleteClick={this.handleUserDeleteClick}
                  handleSendEmailClick={this.handleUserSendEmailClick}
                />
              </Content>
            </Container>
            <EditUserDialog
              // the key prop is needed to ensure the state is reset when a
              // different user is chosen
              key={this.state.editingUser.userId}
              open={this.state.editing}
              onClose={this.handleEditDialogClose}
              onSave={this.handleEditDialogSave}
              firstName={this.state.editingUser.firstName}
              lastName={this.state.editingUser.lastName}
              emailAddress={this.state.editingUser.emailAddress}
              imageURL={this.state.editingUser.imageURL}
              userId={this.state.editingUser.userId}
            />
          </React.Fragment>
        )}
      </UserConsumer>
    )
  }
}

RegisteredUsers.propTypes = {
  userId: PropTypes.string
}

export default RegisteredUsers
