import React from 'react'
import { render, cleanup } from 'react-testing-library'
import 'jest-dom/extend-expect'

import UserTable from './UserTable'

afterEach(cleanup)

describe('UserTable', () => {
  const defaultUsers = [
    {
      userId: 'testUser123',
      firstName: 'Bob',
      lastName: 'Smith',
      emailAddress: 'bob.smith@gmail.com',
      imageUrl: 'https://d3iw72m71ie81c.cloudfront.net/male-52.jpg'
    },
    {
      userId: 'testUser234',
      firstName: 'Jane',
      lastName: 'Doe',
      emailAddress: 'jane.doe@gmail.com',
      imageUrl: 'https://randomuser.me/api/portraits/women/21.jpg'
    },

    {
      userId: 'testUser345',
      firstName: 'James',
      lastName: 'Bond',
      emailAddress: 'james.bond@gmail.com',
      imageUrl: 'https://twostoryrobot.com/not-a-valid-url'
    }
  ]

  it('should render with required props', async () => {
    const { container } = render(
      <UserTable
        users={defaultUsers}
        handleEditClick={() => {}}
        handleDeleteClick={() => {}}
        handleSendEmail={() => {}}
      />
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should display message when there are no registered users', async () => {
    const { container } = render(
      <UserTable
        users={[]}
        handleEditClick={() => {}}
        handleDeleteClick={() => {}}
        handleSendEmail={() => {}}
      />
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should display loading spinner when isLoaded is true', async () => {
    const { container } = render(
      <UserTable
        users={[]}
        isLoading={true}
        handleEditClick={() => {}}
        handleDeleteClick={() => {}}
        handleSendEmail={() => {}}
      />
    )

    expect(container.firstChild).toMatchSnapshot()
  })
})
