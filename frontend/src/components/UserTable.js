import React from 'react'
import PropTypes from 'prop-types'
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
import SortDescendingIcon from 'mdi-react/SortAscendingIcon'
import SortAscendingIcon from 'mdi-react/SortDescendingIcon'

const StyledButtonsCell = withStyles(theme => ({
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
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
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

  toggleSort = sortField => {
    if (this.state.sortField === sortField)
      this.setState({
        sortDirection: this.state.sortDirection === 'asc' ? 'desc' : 'asc'
      })
    else this.setState({ sortField, sortDirection: 'asc' })
  }

  getSortedUsers() {
    //clone a new array for users
    let users = [...this.props.users]
    if (this.state.sortDirection === 'asc')
      users.sort(this.genSortAscendingByField(this.state.sortField))
    else users.sort(this.genSortDescendingByField(this.state.sortField))

    return users
  }

  genSortAscendingByField(field) {
    return (a, b) => {
      const valA = a[field].toUpperCase()
      const valB = b[field].toUpperCase()
      let order = 0
      if (valA < valB) order = -1
      if (valB > valA) order = 1
      return order
    }
  }

  genSortDescendingByField(field) {
    return (a, b) => {
      const valA = a[field].toUpperCase()
      const valB = b[field].toUpperCase()
      let order = 0
      if (valA > valB) order = -1
      if (valB < valA) order = 1
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
      handleSendEmail
    } = this.props

    const { sortField } = this.state
    const sortIcon =
      this.state.sortDirection === 'asc' ? <AscIcon /> : <DescIcon />

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
              <TableRow key={user.userId} className={classes.row}>
                <StyledTableCell component="th" scope="row">
                  <Avatar
                    key={user.userId}
                    src={user.imageUrl}
                    name={`${user.firstName} ${user.lastName}`}
                    size={34}
                    round={true}
                  />
                </StyledTableCell>
                <StyledTableCell>{user.firstName}</StyledTableCell>
                <StyledTableCell>{user.lastName}</StyledTableCell>
                <StyledTableCell>{user.emailAddress}</StyledTableCell>
                {/* TODO This needs to come from the user prop */}
                {/* Note: We are manually overriding this individual column font size */}
                <StyledTableCell style={{ fontSize: '0.875rem' }}>
                  2018 Sept 04
                </StyledTableCell>
                {isAdmin && (
                  <StyledTableCell>
                    <StyledButtonsCell>
                      <IconButton
                        color="primary"
                        onClick={handleEditClick}
                        data-testid="edit">
                        <PencilIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={handleDeleteClick}
                        data-testid="delete">
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={handleSendEmail}
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
      imageUrl: PropTypes.string,
      /** admin flag */
      isAdmin: PropTypes.bool
    })
  ).isRequired,
  isLoading: PropTypes.bool,
  isAdmin: PropTypes.bool.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleSendEmail: PropTypes.func.isRequired
}

UserTable.defaultProps = {
  isLoading: false
}

export default withStyles(styles)(UserTable)
