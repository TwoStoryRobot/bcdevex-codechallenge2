import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions, from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'

const StyledDialogContent = styled(DialogContent)`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 20px;
`

const AvatarWrapper = styled.div`
  grid-column: 1;
`

const StyledForm = styled.form`
  grid-column: 2;
`

export default class EditUserDialog extends Component {
  constructor(props) {
    super(props)

    const { firstName, lastName, avatarUrl, email } = props
    this.state = {
      firstName,
      lastName,
      email,
      avatarUrl
    }
  }

  handleTextFieldChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  handleCheckboxChange = name => event => {
    this.setState({
      [name]: event.target.checked
    })
  }

  handleSave = () => {
    const { firstName, lastName, email, avatarUrl } = this.state

    this.props.onSave({ firstName, lastName, email, avatarUrl })
  }
  
  handleKeyDown = event => {
    if (event.keyCode === 13) {
      this.handleSave()
    }
  }

  render() {
    const { open, onClose } = this.props
    const { firstName, lastName, avatarUrl, email } = this.state
  
    return (
      <Dialog open={open} onClose={onClose} data-testid="edit-user-dialog">
        <DialogTitle>Edit User</DialogTitle>
        <StyledDialogContent>
          <AvatarWrapper>
            <Avatar
              src={avatarUrl}
              name={`${firstName} ${lastName}`}
              round
              size={40}
            />
          </AvatarWrapper>
          <StyledForm onSubmit={this.handleSave}>
            <TextField
              id="first"
              label="First"
              value={firstName}
              onChange={this.handleTextFieldChange('firstName')}
              onKeyDown={this.handleKeyDown}
              fullWidth
              margin="dense"
              autoFocus
            />
            <TextField
              id="last"
              label="Last"
              value={lastName}
              onChange={this.handleTextFieldChange('lastName')}
              onKeyDown={this.handleKeyDown}
              fullWidth
              margin="dense"
            />
            <TextField
              id="email"
              label="Email"
              value={email}
              onChange={this.handleTextFieldChange('email')}
              onKeyDown={this.handleKeyDown}
              type="email"
              fullWidth
              margin="dense"
            />
            <TextField
              id="avatar"
              label="Avatar URL"
              value={avatarUrl}
              onChange={this.handleTextFieldChange('avatarUrl')}
              onKeyDown={this.handleKeyDown}
              fullWidth
              margin="dense"
            />
          </StyledForm>
        </StyledDialogContent>
        <DialogActions>
          <Button onClick={onClose} data-testid="close">Cancel</Button>
          <Button onClick={this.handleSave} color="primary" data-testid="save">Save</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

EditUserDialog.propTypes = {
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  open: PropTypes.bool,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  avatarUrl: PropTypes.string,
}

EditUserDialog.defaultProps = {
  firstName: '',
  lastName: '',
  email: '',
  avatarUrl: '',
  open: false,
  onClose: () => {},
  onSave: () => {},
}