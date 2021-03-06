/* App Bar Story
 */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs/react'
import { action } from '@storybook/addon-actions'
import docgen from './addons/docgen'

import AppBar from '../components/AppBar'

storiesOf('App Bar', module)
  .addDecorator(withKnobs)
  .addDecorator(docgen(AppBar))
  .add('default', () => (
    <AppBar
      title="Code Challenge"
      avatar="https://api.adorable.io/avatars/285/abott@adorable.png"
    />
  ))
  .add('with knobs', () => (
    <AppBar
      title={text('Title', 'Title')}
      avatar={text(
        'Avatar URL',
        'https://api.adorable.io/avatars/285/abott@adorable.png'
      )}
      name={text('Name', 'John Doe')}
      onEdit={action('edit')}
      onSignOut={action('sign out')}
    />
  ))
