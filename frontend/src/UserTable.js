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

const StyledTableCell = withStyles(() => ({
  head: {
    fontSize: '1.25rem',
    color: '#9A9898',
    fontWeight: 400
  },
  body: {
    fontSize: '1.125rem',
    fontWeight: 300
  }
}))(TableCell)

const styles = theme => ({
  root: {
    width: '100%',
    margintTop: theme.spacing.unit * 3,
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

const UserTable = ({ users, classes }) => (
  <Paper>
    <Table>
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
  </Paper>
)

UserTable.propTypes = {
  classes: PropTypes.object.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string,
      emailAddress: PropTypes.emailAddress,
      imageUrl: PropTypes.string
    })
  ).isRequired
}

UserTable.defaultProps = {
  users: [
    {
      userId: 'testUser123',
      firstName: 'Bob',
      lastName: 'Smith',
      emailAddress: 'bob.smith@gmail.com',
      imageUrl: 'https://d3iw72m71ie81c.cloudfront.net/male-52.jpg'
    }
  ]
}

export default withStyles(styles)(UserTable)
