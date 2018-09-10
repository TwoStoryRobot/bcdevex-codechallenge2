import React from 'react'
import PropTypes from 'prop-types'
import { storiesOf } from '@storybook/react'
import { host } from 'storybook-host'
import { withKnobs, number, text } from '@storybook/addon-knobs/react'
import { action } from '@storybook/addon-actions'
import docgen from '@twostoryrobot/storybook-addon-docgen'

import { create } from 'reworm'
import Button from '@material-ui/core/Button'

import AlertDialog from '../AlertDialog'

storiesOf('AlertDialog', module)
  .addDecorator(host())
  .addDecorator(withKnobs)
  .addDecorator(docgen(AlertDialog))
  .add('with knobs', () => {
    // initial button state
    const { get, set } = create({ open: false })

    const message = text('Alert message', 'Are you sure you want to do this?')
    const onOk = () => set({ open: false })
    const onCancel = () => set({ open: false })
    return (
      <div>
        {get(s => (
          <div>
            <Button onClick={() => set({ open: !s.open })}>Toggle Alert</Button>
            <AlertDialog open={s.open} onOk={onOk} onCancel={onCancel}>
              {message}
            </AlertDialog>
          </div>
        ))}
      </div>
    )
  })
