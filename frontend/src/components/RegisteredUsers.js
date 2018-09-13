/* Registered User Page
 * Page to display list of registered users, search field, and app bar
 */

import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { withAuthContext } from './AuthContext'
import AppBar from './AppBar'
import SearchBar from './SearchBar'
import filterStartsWith from '../utils/filterStartsWith'
import UserTable from './UserTable'
import { getUsers } from '../requests.js'

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
    searchText: '',
    fetchUsersController: undefined
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
    const avatar = currentUser && currentUser.imageURL
    const name =
      currentUser && `${currentUser.firstName} ${currentUser.lastName}`

    return (
      <Container>
        <AppBar
          title="Registered Users"
          {...{ avatar, name }}
          onSignOut={this.props.logout}
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
    )
  }
}

RegisteredUsers.propTypes = {
  userId: PropTypes.string
}

export default withAuthContext(RegisteredUsers)
