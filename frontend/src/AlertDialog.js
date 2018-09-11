import React from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

/**
 * A reusable AlertDialog wrapping Dialog
 */
function AlertDialog({
  children,
  onCancel,
  onConfirm,
  cancelLabel,
  confirmLabel,
  ...props
}) {
  return (
    <Dialog {...props} onClose={onCancel}>
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
  /** the confirmation message to display */
  children: PropTypes.text,
  /** label for the cancel button */
  cancelLabel: PropTypes.text,
  /** label for the confirm button */
  confirmLabel: PropTypes.text,
  /** callback for cancel button or when dialog close is fired */
  onCancel: PropTypes.func.isRequired,
  /** callback for the confirm button */
  onConfirm: PropTypes.func.isRequired
}

AlertDialog.defaultProps = {
  children: 'Are you sure you want to do this?',
  cancelLabel: 'Cancel',
  confirmLabel: 'Confirm'
}

export default AlertDialog
