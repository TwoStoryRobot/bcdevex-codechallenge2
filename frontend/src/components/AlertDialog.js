/* Alert Dialog
 * A reusable AlertDialog wrapping Dialog
 */

import React from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

function AlertDialog({
  children,
  onCancel,
  onConfirm,
  cancelLabel,
  confirmLabel,
  ...props
}) {
  return (
    <Dialog {...props} onClose={onCancel} data-testid="alert-dialog">
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          {cancelLabel}
        </Button>
        <Button onClick={onConfirm} color="primary">
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

AlertDialog.propTypes = {
  /** a boolean indidcating whether the dialog is visible */
  open: PropTypes.bool,
  /** the confirmation message to display */
  children: PropTypes.string,
  /** label for the cancel button */
  cancelLabel: PropTypes.string,
  /** label for the confirm button */
  confirmLabel: PropTypes.string,
  /** callback for cancel button or when dialog close is fired */
  onCancel: PropTypes.func.isRequired,
  /** callback for the confirm button */
  onConfirm: PropTypes.func.isRequired
}

AlertDialog.defaultProps = {
  open: false,
  children: 'Are you sure you want to do this?',
  cancelLabel: 'Cancel',
  confirmLabel: 'Confirm'
}

export default AlertDialog
