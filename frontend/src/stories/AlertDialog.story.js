import React from 'react'
import { storiesOf } from '@storybook/react'
import { host } from 'storybook-host'
import { withKnobs, text } from '@storybook/addon-knobs/react'
import { action } from '@storybook/addon-actions'
import docgen from '@twostoryrobot/storybook-addon-docgen'

import { create } from 'reworm'
import Button from '@material-ui/core/Button'

import AlertDialog from '../AlertDialog'

storiesOf('AlertDialog', module)
  .addDecorator(host())
  .addDecorator(withKnobs)
  .addDecorator(docgen(AlertDialog))
  .add('default - open', () => {
    const onOk = action('Ok clicked')
    const onCancel = action('Cancel clicked')
    return <AlertDialog open={true} onOk={onOk} onCancel={onCancel} />
  })
  .add('with knobs', () => {
    // simple story state with reworm
    const { get, set } = create({ open: false })

    const message = text('Alert message', 'Are you sure you want to do this?')
    const cancelLabel = text('Cancel Label', 'No')
    const confirmLabel = text('Confirm Label', 'Yes')
    const onConfirm = () => set({ open: false })
    const onCancel = () => set({ open: false })

    return (
      <div>
        {get(s => (
          <div>
            <Button onClick={() => set({ open: !s.open })}>Toggle Alert</Button>
            <AlertDialog
              open={s.open}
              onConfirm={onConfirm}
              onCancel={onCancel}
              cancelLabel={cancelLabel}
              confirmLabel={confirmLabel}>
              {message}
            </AlertDialog>
          </div>
        ))}
      </div>
    )
  })
