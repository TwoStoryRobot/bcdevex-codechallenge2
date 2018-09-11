import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'react-avatar'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import UserSearchIcon from 'mdi-react/UserSearchIcon'

const StyledTableCell = withStyles(theme => ({
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
  }
})

/**
 *  A table to list all registered users
 */
const UserTable = ({ users, classes }) => (
  <Paper className={classes.root}>
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <StyledTableCell />
          <StyledTableCell>First</StyledTableCell>
          <StyledTableCell>Last</StyledTableCell>
          <StyledTableCell>Email</StyledTableCell>
          <StyledTableCell>Registration</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map(user => (
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
    {users.length === 0 && (
      <Message>
        <UserSearchIcon size={64} />
        <p>There are currently no registered users.</p>
      </Message>
    )}
  </Paper>
)

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
      imageUrl: PropTypes.string
    })
  ).isRequired
}

export default withStyles(styles)(UserTable)
