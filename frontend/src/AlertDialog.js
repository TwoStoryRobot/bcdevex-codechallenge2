import React from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

function AlertDialog({ children, onCancel, onOk, ...props }) {
  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  )
}

AlertDialog.propTypes = {
  children: PropTypes.text
}

AlertDialog.defaultProps = {
  children: 'Are you sure you want to do this?'
}

export default AlertDialog
