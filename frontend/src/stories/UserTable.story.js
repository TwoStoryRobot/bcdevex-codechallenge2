import React from 'react'
import { storiesOf } from '@storybook/react'
import { host } from 'storybook-host'
import { withKnobs } from '@storybook/addon-knobs/react'
import { action } from '@storybook/addon-actions'
import docgen from '@twostoryrobot/storybook-addon-docgen'

import UserTable from '../components/UserTable'

const defaultUsers = [
  {
    userId: 'testUser123',
    firstName: 'Bob',
    lastName: 'Smith',
    emailAddress: 'bob.smith@gmail.com',
    imageURL: 'https://d3iw72m71ie81c.cloudfront.net/male-52.jpg'
  },
  {
    userId: 'testUser234',
    firstName: 'Jane',
    lastName: 'Doe',
    emailAddress: 'jane.doe@gmail.com',
    imageURL: 'https://randomuser.me/api/portraits/women/21.jpg'
  },

  {
    userId: 'testUser345',
    firstName: 'James',
    lastName: 'Bond',
    emailAddress: 'james.bond@gmail.com',
    imageURL: 'https://twostoryrobot.com/not-a-valid-url'
  }
]

storiesOf('UserTable', module)
  .addDecorator(host())
  .addDecorator(docgen(UserTable))
  .add('default', () => {
    return <UserTable users={defaultUsers} />
  })
  .add('empty users array', () => {
    return <UserTable users={[]} />
  })
  .add('loading state', () => {
    return <UserTable users={[]} isLoading={true} />
  })
