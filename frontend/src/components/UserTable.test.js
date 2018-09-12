import React from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
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

  it('should render with required props', async () => {
    const { container } = render(
      <UserTable
        users={defaultUsers}
        isAdmin={true}
        userId={defaultUsers[0].userId}
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
        isAdmin={true}
        userId={defaultUsers[0].userId}
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
        isAdmin={true}
        userId={defaultUsers[0].userId}
        handleEditClick={() => {}}
        handleDeleteClick={() => {}}
        handleSendEmail={() => {}}
      />
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should display the pencil icon for all users if user is admin', async () => {
    const { getAllByTestId, container } = render(
      <UserTable
        users={defaultUsers}
        isLoading={false}
        isAdmin={true}
        userId={defaultUsers[0].userId}
        handleEditClick={() => {}}
        handleDeleteClick={() => {}}
        handleSendEmail={() => {}}
      />
    )

    const pencilIcons = getAllByTestId('edit')
    expect(pencilIcons).toHaveLength(3)
  })

  it('should display the pencil icon for current user only if user is not admin', async () => {
    const { getAllByTestId, container } = render(
      <UserTable
        users={defaultUsers}
        isLoading={false}
        isAdmin={false}
        userId={defaultUsers[1].userId}
        handleEditClick={() => {}}
        handleDeleteClick={() => {}}
        handleSendEmail={() => {}}
      />
    )

    const pencilIcons = getAllByTestId('edit')
    expect(pencilIcons).toHaveLength(1)
  })

  it('should display the delete and evelope icons if user is admin', async () => {
    const { getByTestId, container } = render(
      <UserTable
        users={defaultUsers}
        isLoading={false}
        isAdmin={true}
        userId={defaultUsers[0].userId}
        handleEditClick={() => {}}
        handleDeleteClick={() => {}}
        handleSendEmail={() => {}}
      />
    )

    const deleteIcon = getByTestId('delete')
    expect(deleteIcon).toBeDefined()
    const emailIcon = getByTestId('email')
    expect(emailIcon).toBeDefined()
  })

  it('should not display the delete and evelope icons if user is not admin', async () => {
    const { getByTestId, container } = render(
      <UserTable
        users={[defaultUsers[1]]}
        isLoading={false}
        isAdmin={false}
        userId={defaultUsers[1].userId}
        handleEditClick={() => {}}
        handleDeleteClick={() => {}}
        handleSendEmail={() => {}}
      />
    )

    expect(() => {
      const deleteIcon = getByTestId('delete')
    }).toThrow()

    expect(() => {
      const emailIcon = getByTestId('email')
    }).toThrow()
  })

  it('should fire handleEditClick when the pencil icon is clicked', async () => {
    const handleEditClick = jest.fn()
    const handleDeleteClick = jest.fn()
    const handleSendEmail = jest.fn()

    const { getByTestId } = render(
      <UserTable
        users={defaultUsers}
        isLoading={true}
        isAdmin={true}
        userId={defaultUsers[0].userId}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        handleSendEmail={handleSendEmail}
      />
    )

    const button = getByTestId('edit')
    fireEvent.click(button)

    expect(handleEditClick).toHaveBeenCalled()
    expect(handleDeleteClick).not.toHaveBeenCalled()
    expect(handleSendEmail).not.toHaveBeenCalled()
  })

  it('should fire handleDeleteClick when the delete icon is clicked', async () => {
    const handleEditClick = jest.fn()
    const handleDeleteClick = jest.fn()
    const handleSendEmail = jest.fn()

    const { getByTestId } = render(
      <UserTable
        users={defaultUsers}
        isLoading={true}
        isAdmin={true}
        userId={defaultUsers[0].userId}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        handleSendEmail={handleSendEmail}
      />
    )

    const button = getByTestId('delete')
    fireEvent.click(button)

    expect(handleDeleteClick).toHaveBeenCalled()
    expect(handleEditClick).not.toHaveBeenCalled()
    expect(handleSendEmail).not.toHaveBeenCalled()
  })

  it('should fire handleSendEmail when the envelope icon is clicked', async () => {
    const handleEditClick = jest.fn()
    const handleDeleteClick = jest.fn()
    const handleSendEmail = jest.fn()

    const { getByTestId } = render(
      <UserTable
        users={defaultUsers}
        isLoading={true}
        isAdmin={true}
        userId={defaultUsers[0].userId}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        handleSendEmail={handleSendEmail}
      />
    )

    const button = getByTestId('email')
    fireEvent.click(button)

    expect(handleSendEmail).toHaveBeenCalled()
    expect(handleEditClick).not.toHaveBeenCalled()
    expect(handleDeleteClick).not.toHaveBeenCalled()
  })
})
