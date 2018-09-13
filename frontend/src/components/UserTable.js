/* User Table
 * Lists the registered users in a table
 */

import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Avatar from 'react-avatar'
import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import UserSearchIcon from 'mdi-react/UserSearchIcon'
import DeleteIcon from 'mdi-react/DeleteIcon'
import PencilIcon from 'mdi-react/PencilIcon'
import EnvelopeIcon from 'mdi-react/EnvelopeIcon'
import SortAscendingIcon from 'mdi-react/SortAscendingIcon'
import SortDescendingIcon from 'mdi-react/SortDescendingIcon'

const StyledButtonsCell = withStyles(() => ({
  root: {
    display: 'flex'
  }
}))(({ classes, children, ...rest }) => (
  <div {...rest} className={classes.root}>
    {children}
  </div>
))

const StyledTableCell = withStyles(theme => ({
  root: {
    padding: '4px 16px 4px 16px'
  },
  head: {
    fontSize: '1.25rem',
    color: theme.palette.text.hint,
    fontWeight: 400
  },
  body: {
    fontSize: '1.125rem',
    fontWeight: 300
  }
}))(TableCell)

const Message = withStyles(theme => ({
  root: {
    textAlign: 'center',
    margin: theme.spacing.unit * 3,
    color: theme.palette.text.secondary
  }
}))(({ classes, children, ...rest }) => (
  <div {...rest} className={classes.root}>
    {children}
  </div>
))

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  },
  admin: {
    backgroundColor: '#f0c243'
  }
})

const AscIcon = styled(SortAscendingIcon)`
  margin-left: 8px;
`

const DescIcon = styled(SortDescendingIcon)`
  margin-left: 8px;
`

const EmptyIcon = styled.span`
  width: 32px;
  height: 24px;
`

/**
 *  A table to list all registered users
 */
class UserTable extends React.Component {
  state = {
    sortField: 'lastName',
    sortDirection: 'asc'
  }

  // This function sets the active sort field and toggles the direction
  // By default, if the sort field is changed we use ascending direction
  toggleSort = sortField => {
    if (this.state.sortField === sortField)
      this.setState({
        sortDirection: this.state.sortDirection === 'asc' ? 'desc' : 'asc'
      })
    else this.setState({ sortField, sortDirection: 'desc' })
  }

  // Return a new array with users sorted according to the current sort state
  getSortedUsers() {
    //clone a new array for users
    let users = [...this.props.users]
    if (this.state.sortDirection === 'asc') {
      users.sort(this.genSortAscendingByField(this.state.sortField))
    } else {
      users.sort(this.genSortDescendingByField(this.state.sortField))
    }

    return users
  }

  // get a ascending sorting function for a specific field
  genSortAscendingByField(field) {
    return (a, b) => {
      const valA = a[field].toUpperCase()
      const valB = b[field].toUpperCase()
      let order = 0
      if (valA < valB) order = -1
      if (valA > valB) order = 1
      return order
    }
  }

  // get a descending sorting function for a specific field
  genSortDescendingByField(field) {
    return (a, b) => {
      const valA = a[field].toUpperCase()
      const valB = b[field].toUpperCase()
      let order = 0
      if (valA < valB) order = 1
      if (valA > valB) order = -1
      return order
    }
  }

  render() {
    const {
      users,
      classes,
      isLoading,
      isAdmin,
      handleEditClick,
      handleDeleteClick,
      handleSendEmailClick
    } = this.props

    const { sortField, sortDirection } = this.state
    const sortIcon = sortDirection === 'asc' ? <AscIcon /> : <DescIcon />

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell />
              <StyledTableCell>
                <Button onClick={() => this.toggleSort('firstName')}>
                  First
                  {sortField === 'firstName' ? sortIcon : <EmptyIcon />}
                </Button>
              </StyledTableCell>
              <StyledTableCell>
                <Button onClick={() => this.toggleSort('lastName')}>
                  Last
                  {sortField === 'lastName' ? sortIcon : <EmptyIcon />}
                </Button>
              </StyledTableCell>
              <StyledTableCell>
                <Button onClick={() => this.toggleSort('emailAddress')}>
                  Email
                  {sortField === 'emailAddress' ? sortIcon : <EmptyIcon />}
                </Button>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="button">Registration</Typography>
              </StyledTableCell>
              {isAdmin && <StyledTableCell />}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.getSortedUsers().map(user => (
              <TableRow key={user.userId}>
                <StyledTableCell component="th" scope="row">
                  <Avatar
                    key={user.userId}
                    src={user.imageURL}
                    name={`${user.firstName} ${user.lastName}`}
                    size={34}
                    round={true}
                  />
                </StyledTableCell>
                <StyledTableCell>{user.firstName}</StyledTableCell>
                <StyledTableCell>{user.lastName}</StyledTableCell>
                <StyledTableCell>{user.emailAddress}</StyledTableCell>
                {/* Note: We are manually overriding this individual column font size */}
                <StyledTableCell style={{ fontSize: '0.875rem' }}>
                  {moment(user.registeredAt).format('DD-MMM-YYYY')}
                </StyledTableCell>
                {isAdmin && (
                  <StyledTableCell>
                    <StyledButtonsCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleEditClick(user)}
                        data-testid="edit">
                        <PencilIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() =>
                          handleDeleteClick(
                            `${user.firstName} ${user.lastName}`,
                            user.userId
                          )
                        }
                        data-testid="delete">
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        disabled={!user.emailAddress}
                        onClick={() => handleSendEmailClick(user)}
                        data-testid="email">
                        <EnvelopeIcon />
                      </IconButton>
                    </StyledButtonsCell>
                  </StyledTableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {users.length === 0 &&
          !isLoading && (
            <Message>
              <UserSearchIcon size={64} />
              <p>There are currently no registered users.</p>
            </Message>
          )}
        {isLoading && (
          <Message>
            <CircularProgress size={64} />
            <p>Loading...</p>
          </Message>
        )}
      </Paper>
    )
  }
}

UserTable.propTypes = {
  /** classes provided by the withStyles HOC */
  classes: PropTypes.object.isRequired,
  /** user object */
  users: PropTypes.arrayOf(
    PropTypes.shape({
      /** id of user */
      userId: PropTypes.string.isRequired,
      /** first name of user */
      firstName: PropTypes.string.isRequired,
      /** last name of user */
      lastName: PropTypes.string,
      /** email address of user (used to send email) */
      emailAddress: PropTypes.emailAddress,
      /** url of user's Avatar */
      imageURL: PropTypes.string,
      /** admin flag */
      isAdmin: PropTypes.bool,
      /** date of user registration */
      registeredAt: PropTypes.string
    })
  ).isRequired,
  isLoading: PropTypes.bool,
  isAdmin: PropTypes.bool.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleSendEmailClick: PropTypes.func.isRequired
}

UserTable.defaultProps = {
  isLoading: false,
  isAdmin: false
}

export default withStyles(styles)(UserTable)
