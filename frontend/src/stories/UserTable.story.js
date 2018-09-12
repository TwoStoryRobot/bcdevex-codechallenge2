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
    imageURL: 'https://d3iw72m71ie81c.cloudfront.net/male-52.jpg',
    isAdmin: true,
    registeredAt: '2018-09-12T14:35:38-07:00'
  },
  {
    userId: 'testUser234',
    firstName: 'Jane',
    lastName: 'Doe',
    emailAddress: 'jane.doe@gmail.com',
    imageURL: 'https://randomuser.me/api/portraits/women/21.jpg',
    isAdmin: false,
    registeredAt: '2018-09-13T14:35:38-07:00'
  },
  {
    userId: 'testUser345',
    firstName: 'James',
    lastName: 'Bond',
    emailAddress: 'james.bond@gmail.com',
    imageURL: 'https://twostoryrobot.com/not-a-valid-url',
    isAdmin: false,
    registeredAt: '2018-09-14T14:35:38-07:00'
  },
  {
    userId: 'testUser678',
    firstName: 'Mary',
    lastName: 'Lou',
    emailAddress: 'mary.lou@gmail.com',
    imageURL: 'https://twostoryrobot.com/not-a-valid-url',
    isAdmin: false,
    registeredAt: '2018-09-14T14:35:38-07:00'
  }
]

const handleEditClick = linkTo('Edit User Dialog', 'With supplied values')
const handleDeleteClick = linkTo('AlertDialog', 'Example - Confirm delete')
const handleSendEmailClick = linkTo('AlertDialog', 'Example - Send email')

storiesOf('UserTable', module)
  .addDecorator(host())
  .addDecorator(docgen(UserTable))
  .add('default', () => {
    return (
      <UserTable
        users={defaultUsers}
        isAdmin={true}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        handleSendEmailClick={handleSendEmailClick}
      />
    )
  })
  .add('not admin', () => {
    return (
      <UserTable
        users={defaultUsers}
        isAdmin={false}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        handleSendEmailClick={handleSendEmailClick}
      />
    )
  })
  .add('empty users array', () => {
    return (
      <UserTable
        users={[]}
        isAdmin={true}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        handleSendEmailClick={handleSendEmailClick}
      />
    )
  })
  .add('loading state', () => {
    return (
      <UserTable
        users={[]}
        isLoading={true}
        isAdmin={true}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        handleSendEmailClick={handleSendEmailClick}
      />
    )
  })
