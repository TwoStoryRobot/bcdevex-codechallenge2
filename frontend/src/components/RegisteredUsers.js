/* Registered User Page
 * Page to display list of registered users, search field, and app bar
 */

import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { withAuthContext } from './AuthContext'
import AppBar from './AppBar'
import AlertDialog from './AlertDialog'
import UserTable from './UserTable'
import { getUsers, deleteUser } from '../requests.js'

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
    isAlertDialogOpen: false,
    alertMessage: '',
    deleteUserId: null
  }

  componentDidMount() {
    //  Fetch all users
    this.setState({ isFetchingUsers: true })
    getUsers()
      .then(({ users, controller }) => {
        const currentUser = users.find(
          user => user.userId === this.props.userId
        )
        this.setState({
          users,
          currentUser,
          isFetchingUsers: false,
          fetchUsersController: controller
        })
      })
      .catch(err => {
        if (err && err.status === 401) return this.props.history.push('/logout')
        else throw err
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

  handleUserDeleteClick = (name, userId) => {
    this.setState({
      isAlertDialogOpen: true,
      alertMessage: `Are you sure you want to delete ${name}?`,
      deleteUserId: userId
    })
  }

  onCancelDelete = () => {
    this.setState({ isAlertDialogOpen: false })
  }

  onConfirmDelete = async () => {
    this.setState({ isAlertDialogOpen: false })
    if (!this.state.deleteUserId) return

    await deleteUser(this.state.deleteUserId)

    if (this.state.currentUser.userId === this.state.deleteUserId)
      return this.props.logout()

    this.setState({ deleteUserId: null })

    getUsers().then(({ users }) => this.setState({ users }))
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
      <Container>
        <AlertDialog
          open={this.state.isAlertDialogOpen}
          onCancel={this.onCancelDelete}
          onConfirm={this.onConfirmDelete}>
          {this.state.alertMessage}
        </AlertDialog>
        <AppBar
          title="Registered Users"
          {...{ avatar, name }}
          onSignOut={this.props.logout}
          onDelete={() =>
            this.handleUserDeleteClick('your profile', currentUser.userId)
          }
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
    )
  }
}

RegisteredUsers.propTypes = {
  userId: PropTypes.string
}

export default withAuthContext(RegisteredUsers)
