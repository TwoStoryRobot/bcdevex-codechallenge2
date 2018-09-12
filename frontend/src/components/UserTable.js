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
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import UserSearchIcon from 'mdi-react/UserSearchIcon'
import DeleteIcon from 'mdi-react/DeleteIcon'
import PencilIcon from 'mdi-react/PencilIcon'
import EnvelopeIcon from 'mdi-react/EnvelopeIcon'

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

/**
 *  A table to list all registered users
 */
const UserTable = ({
  users,
  classes,
  isLoading,
  isAdmin,
  handleEditClick,
  handleDeleteClick,
  handleSendEmailClick
}) => (
  <Paper className={classes.root}>
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <StyledTableCell />
          <StyledTableCell>First</StyledTableCell>
          <StyledTableCell>Last</StyledTableCell>
          <StyledTableCell>Email</StyledTableCell>
          <StyledTableCell>Registration</StyledTableCell>
          {isAdmin && <StyledTableCell />}
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map(user => (
          <TableRow key={user.userId} className={classes.row}>
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
                    onClick={handleSendEmailClick}
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
      isAdmin: PropTypes.bool
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
