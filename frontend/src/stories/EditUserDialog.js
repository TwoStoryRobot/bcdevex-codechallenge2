import React from 'react'
import { storiesOf } from '@storybook/react'
import EditUserDialog from '../components/EditUserDialog'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

storiesOf('Edit User Dialog', module)
  .addDecorator(withKnobs)
  .add('Default', () => <EditUserDialog open={true} />)
  .add('With knobs', () => (
    <EditUserDialog
      open={boolean('Open', true)}
      onSave={action('save')}
      onClose={action('close')}
    />
  ))
  .add('With default values', () => (
    <EditUserDialog
      firstName="Caleb"
      lastName="Sharp"
      email="caleb.sharp@twostoryrobot.com"
      isAdmin={false}
      avatarUrl="https://api.adorable.io/avatars/285/abott@adorable.png"
      open={true}
    />
  ))
