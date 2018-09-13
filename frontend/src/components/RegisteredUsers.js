/* Registered User Page
 * Page to display list of registered users, search field, and app bar
 */

import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'
import { withAuthContext } from './AuthContext'
import AppBar from './AppBar'
import SearchBar from './SearchBar'
import filterStartsWith from '../utils/filterStartsWith'
import UserTable from './UserTable'
import EditUserDialog from './EditUserDialog'
import { getUsers, updateUser } from '../requests.js'

const Container = styled.div`
  padding-top: 64px;
`

const Content = styled.div`
  max-width: calc(100vw - 150px);
  margin: 50px auto;
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
    snackbar: '',
    searchText: ''
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

  closeSnackbar = () => {
    this.setState({ snackbar: '' })
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
      currentUser: this.state.currentUser.userId === userId ? mergedUser : this.state.currentUser,
      snackbar: 'User updated'
    })

    updateUser(mergedUser)

    this.handleEditDialogClose()

  handleSearchChange = e => {
    this.setState({ searchText: e.target.value })
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
    const { currentUser, users, isFetchingUsers, searchText } = this.state
    const { logout } = this.props
    const avatar = currentUser && currentUser.imageURL
    const name =
      currentUser && `${currentUser.firstName} ${currentUser.lastName}`

    return (
      <React.Fragment>
        <Container>
          <AppBar
            title="Registered Users"
            {...{ avatar, name }}
            onSignOut={logout}
            onEdit={this.handleEditCurrentUser}
          />
          <Content>
            <SearchBar value={searchText} onChange={this.handleSearchChange} />
            <UserTable
              users={users.filter(filterStartsWith(searchText))}
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
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={!!this.state.snackbar}
          autoHideDuration={3000}
          onClose={this.closeSnackbar}
          message={this.state.snackbar}
        />
      </React.Fragment>
)
  }
}

RegisteredUsers.propTypes = {
  userId: PropTypes.string
}

export default withAuthContext(RegisteredUsers)
