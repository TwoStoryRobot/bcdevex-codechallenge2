/* Edit User Dialog Story
 */

import React from 'react'
import { storiesOf } from '@storybook/react'
import EditUserDialog from '../components/EditUserDialog'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import docgen from './addons/docgen'

storiesOf('Edit User Dialog', module)
  .addDecorator(withKnobs)
  .addDecorator(docgen(EditUserDialog))
  .add('Default', () => <EditUserDialog open={true} />)
  .add('With knobs', () => (
    <EditUserDialog
      open={boolean('Open', true)}
      onSave={action('save')}
      onClose={action('close')}
    />
  ))
  .add('With supplied values', () => (
    <EditUserDialog
      firstName="Caleb"
      lastName="Sharp"
      emailAddress="caleb.sharp@twostoryrobot.com"
      imageURL="https://api.adorable.io/avatars/285/abott@adorable.png"
      open={true}
    />
  ))
