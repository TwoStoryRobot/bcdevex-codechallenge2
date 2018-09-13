/* Edit User Dialog
 * Popup dialog for editing users
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Avatar from 'react-avatar'
import styled from 'styled-components'
import { FormControl, FormHelperText } from '@material-ui/core'
import validateEmail from '../utils/validateEmail'
import validateUrl from 'valid-url'

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

/**
 * EditUserDialog
 *
 * For editing a user. Wraps Dialog
 */
export default class EditUserDialog extends Component {
  state = {
    firstName: this.props.firstName,
    lastName: this.props.lastName,
    emailAddress: this.props.emailAddress,
    imageURL: this.props.imageURL,
    userId: this.props.userId,
    errors: {}
  }

  handleTextFieldChange = name => event => {
    // Checks that any required field is not an empty string
    // Currently only the 'First Name' field is required
    if (event.target.required && event.target.value.trim() === '') {
      this.setState({
        errors: Object.assign(this.state.errors, {
          [name]: 'The field is required'
        })
      })
    } else {
      this.setState({
        errors: Object.assign(this.state.errors, {
          [name]: null
        })
      })
    }

    // Check that a valid email address is supplied
    const validEmail =
      validateEmail(event.target.value.trim()) ||
      event.target.value.trim() === ''

    if (name === 'emailAddress' && !validEmail) {
      this.setState({
        errors: Object.assign(this.state.errors, {
          emailAddress: 'Please enter a valid email (eg. user@mail.com)'
        })
      })
    }

    // Check that a valid URL is supplied
    const validURL =
      validateUrl.isWebUri(event.target.value.trim()) ||
      event.target.value.trim() === ''

    if (name === 'imageURL' && !validURL) {
      this.setState({
        errors: Object.assign(this.state.errors, {
          imageURL: 'Please enter a valid URL'
        })
      })
    }

    this.setState({
      [name]: event.target.value
    })
  }

  handleCheckboxChange = name => event => {
    this.setState({
      [name]: event.target.checked
    })
  }

  handleSave = () => {
    if (!Object.values(this.state.errors).filter(n => n).length) {
      const user = { ...this.state }
      delete user.errors

      this.props.onSave(user)
    }
  }

  handleKeyDown = event => {
    if (event.keyCode === 13) {
      this.handleSave()
    }
  }

  render() {
    const { open, onClose } = this.props
    const { firstName, lastName, imageURL, emailAddress, errors } = this.state

    return (
      <Dialog open={open} onClose={onClose} data-testid="edit-user-dialog">
        <DialogTitle>Edit User</DialogTitle>
        <StyledDialogContent>
          <AvatarWrapper>
            <Avatar
              src={imageURL}
              name={`${firstName} ${lastName}`}
              round
              size={40}
            />
          </AvatarWrapper>
          <StyledForm onSubmit={this.handleSave}>
            <FormControl fullWidth>
              <TextField
                id="first"
                label="First"
                value={firstName}
                onChange={this.handleTextFieldChange('firstName')}
                onKeyDown={this.handleKeyDown}
                fullWidth
                margin="dense"
                autoFocus
                required
                error={errors.firstName ? true : false}
              />
              {errors.firstName && (
                <FormHelperText>{errors.firstName}</FormHelperText>
              )}
            </FormControl>
            <TextField
              id="last"
              label="Last"
              value={lastName}
              onChange={this.handleTextFieldChange('lastName')}
              onKeyDown={this.handleKeyDown}
              fullWidth
              margin="dense"
            />
            <FormControl fullWidth>
              <TextField
                id="emailAddress"
                label="Email"
                value={emailAddress}
                onChange={this.handleTextFieldChange('emailAddress')}
                onKeyDown={this.handleKeyDown}
                type="emailAddress"
                fullWidth
                margin="dense"
                error={errors.emailAddress ? true : false}
              />
              {errors.emailAddress && (
                <FormHelperText>{errors.emailAddress}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth>
              <TextField
                id="avatar"
                label="Avatar URL"
                value={imageURL}
                onChange={this.handleTextFieldChange('imageURL')}
                onKeyDown={this.handleKeyDown}
                fullWidth
                margin="dense"
                error={errors.imageURL ? true : false}
              />
              {errors.imageURL && (
                <FormHelperText>{errors.imageURL}</FormHelperText>
              )}
            </FormControl>
          </StyledForm>
        </StyledDialogContent>
        <DialogActions>
          <Button onClick={onClose} data-testid="close">
            Cancel
          </Button>
          <Button onClick={this.handleSave} color="primary" data-testid="save">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

EditUserDialog.propTypes = {
  /** called when user closes out the model, does not call onSave */
  onClose: PropTypes.func,
  /** called with internal user state when user saves form */
  onSave: PropTypes.func,
  /** controll the dialog open or close */
  open: PropTypes.bool,
  /** initial state first name of the user */
  firstName: PropTypes.string,
  /** initial state last name of the user */
  lastName: PropTypes.string,
  /** initial state email of the user */
  emailAddress: PropTypes.string,
  /** initial state avatar of the user */
  imageURL: PropTypes.string,
  /** the id of the user  */
  userId: PropTypes.string
}

EditUserDialog.defaultProps = {
  firstName: '',
  lastName: '',
  emailAddress: '',
  imageURL: '',
  open: false,
  onClose: () => {},
  onSave: () => {}
}
