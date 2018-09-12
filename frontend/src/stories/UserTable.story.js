import React from 'react'
import { storiesOf } from '@storybook/react'
import { host } from 'storybook-host'
import { withKnobs } from '@storybook/addon-knobs/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import docgen from '@twostoryrobot/storybook-addon-docgen'

import UserTable from '../components/UserTable'

const defaultUsers = [
  {
    userId: 'testUser123',
    firstName: 'Bob',
    lastName: 'Smith',
    emailAddress: 'bob.smith@gmail.com',
    imageUrl: 'https://d3iw72m71ie81c.cloudfront.net/male-52.jpg',
    isAdmin: true
  },
  {
    userId: 'testUser234',
    firstName: 'Jane',
    lastName: 'Doe',
    emailAddress: 'jane.doe@gmail.com',
    imageUrl: 'https://randomuser.me/api/portraits/women/21.jpg',
    isAdmin: false
  },

  {
    userId: 'testUser345',
    firstName: 'James',
    lastName: 'Bond',
    emailAddress: 'james.bond@gmail.com',
    imageUrl: 'https://twostoryrobot.com/not-a-valid-url',
    isAdmin: false
  }
]

const handleEditClick = linkTo('Edit User Dialog', 'With supplied values')
const handleDeleteClick = linkTo('AlertDialog', 'Example - Confirm delete')
const handleSendEmail = linkTo('AlertDialog', 'Example - Send email')

storiesOf('UserTable', module)
  .addDecorator(host())
  .addDecorator(docgen(UserTable))
  .add('default', () => {
    return (
      <UserTable
        users={defaultUsers}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        handleSendEmail={handleSendEmail}
      />
    )
  })
  .add('empty users array', () => {
    return (
      <UserTable
        users={[]}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        handleSendEmail={handleSendEmail}
      />
    )
  })
  .add('loading state', () => {
    return (
      <UserTable
        users={[]}
        isLoading={true}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        handleSendEmail={handleSendEmail}
      />
    )
  })
