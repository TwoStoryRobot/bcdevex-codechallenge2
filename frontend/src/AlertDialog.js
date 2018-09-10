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
    <Dialog {...props}>
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
  children: PropTypes.text,
  cancelLabel: PropTypes.text,
  confirmLabel: PropTypes.text,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
}

AlertDialog.defaultProps = {
  children: 'Are you sure you want to do this?',
  cancelLabel: 'Cancel',
  confirmLabel: 'Confirm'
}

export default AlertDialog
