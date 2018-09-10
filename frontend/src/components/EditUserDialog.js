import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog,
  DialogTitle,
  TextField,
  Checkbox,
  FormControlLabel,
  DialogContent,
  DialogActions, 
  Button
} from '@material-ui/core'
import Avatar from 'react-avatar'
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

    const { firstName, lastName, avatarUrl, isAdmin } = props
    this.state = {
      firstName,
      lastName,
      avatarUrl,
      isAdmin
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
    const { firstName, lastName, avatarUrl, isAdmin } = this.state

    this.props.onSave({ firstName, lastName, avatarUrl, isAdmin })
  }

  render() {
    const { open, onClose } = this.props
    const { firstName, lastName, avatarUrl, isAdmin } = this.state
  
    return (
      <Dialog open={open} onClose={onClose}>
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
              label="First"
              value={firstName}
              onChange={this.handleTextFieldChange('firstName')}
              fullWidth
              margin="dense"
              autoFocus
            />
            <TextField
              label="Last"
              value={lastName}
              onChange={this.handleTextFieldChange('lastName')}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Avatar URL"
              value={avatarUrl}
              onChange={this.handleTextFieldChange('avatarUrl')}
              fullWidth
              margin="dense"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isAdmin}
                  onChange={this.handleCheckboxChange('isAdmin')}
                  value="isAdmin"
                />
              }
              label="Admin"
            />
          </StyledForm>
        </StyledDialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={this.handleSave} color="primary">Save</Button>
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
  avatarUrl: PropTypes.string,
  isAdmin: PropTypes.bool,
}

EditUserDialog.defaultProps = {
  firstName: '',
  lastName: '',
  avatarUrl: '',
  isAdmin: false,
  open: false,
  onClose: () => {},
  onSave: () => {},
}