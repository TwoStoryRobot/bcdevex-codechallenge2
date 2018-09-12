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
      imageURL: 'https://d3iw72m71ie81c.cloudfront.net/male-52.jpg',
      isAdmin: true
    },
    {
      userId: 'testUser234',
      firstName: 'Jane',
      lastName: 'Doe',
      emailAddress: 'jane.doe@gmail.com',
      imageURL: 'https://randomuser.me/api/portraits/women/21.jpg',
      isAdmin: false
    },

    {
      userId: 'testUser345',
      firstName: 'James',
      lastName: 'Bond',
      emailAddress: 'james.bond@gmail.com',
      imageURL: 'https://twostoryrobot.com/not-a-valid-url',
      isAdmin: false
    }
  ]

  it('should render with required props', async () => {
    const { container } = render(
      <UserTable
        users={defaultUsers}
        isAdmin={true}
        handleEditClick={() => {}}
        handleDeleteClick={() => {}}
        handleSendEmailClick={() => {}}
      />
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should display message when there are no registered users', async () => {
    const { container } = render(
      <UserTable
        users={[]}
        isAdmin={true}
        handleEditClick={() => {}}
        handleDeleteClick={() => {}}
        handleSendEmailClick={() => {}}
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
        handleEditClick={() => {}}
        handleDeleteClick={() => {}}
        handleSendEmailClick={() => {}}
      />
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should display the action icons if user is admin', async () => {
    const { getByTestId, container } = render(
      <UserTable
        users={defaultUsers}
        isLoading={false}
        isAdmin={true}
        handleEditClick={() => {}}
        handleDeleteClick={() => {}}
        handleSendEmailClick={() => {}}
      />
    )

    const pencilIcon = getByTestId('edit')
    expect(pencilIcon).toBeDefined()
    const deleteIcon = getByTestId('delete')
    expect(deleteIcon).toBeDefined()
    const emailIcon = getByTestId('email')
    expect(emailIcon).toBeDefined()
  })

  it('should not display the action icons if user is not admin', async () => {
    const { getByTestId, container } = render(
      <UserTable
        users={[defaultUsers[1]]}
        isLoading={false}
        isAdmin={false}
        handleEditClick={() => {}}
        handleDeleteClick={() => {}}
        handleSendEmailClick={() => {}}
      />
    )

    expect(() => {
      const pencilIcon = getByTestId('edit')
    }).toThrow()

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
    const handleSendEmailClick = jest.fn()

    const { getByTestId } = render(
      <UserTable
        users={defaultUsers}
        isLoading={true}
        isAdmin={true}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        handleSendEmailClick={handleSendEmailClick}
      />
    )

    const button = getByTestId('edit')
    fireEvent.click(button)

    expect(handleEditClick).toHaveBeenCalled()
    expect(handleDeleteClick).not.toHaveBeenCalled()
    expect(handleSendEmailClick).not.toHaveBeenCalled()
  })

  it('should fire handleDeleteClick when the delete icon is clicked', async () => {
    const handleEditClick = jest.fn()
    const handleDeleteClick = jest.fn()
    const handleSendEmailClick = jest.fn()

    const { getByTestId } = render(
      <UserTable
        users={defaultUsers}
        isLoading={true}
        isAdmin={true}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        handleSendEmailClick={handleSendEmailClick}
      />
    )

    const button = getByTestId('delete')
    fireEvent.click(button)

    expect(handleDeleteClick).toHaveBeenCalled()
    expect(handleEditClick).not.toHaveBeenCalled()
    expect(handleSendEmailClick).not.toHaveBeenCalled()
  })

  it('should fire handleSendEmailClick when the envelope icon is clicked', async () => {
    const handleEditClick = jest.fn()
    const handleDeleteClick = jest.fn()
    const handleSendEmailClick = jest.fn()

    const { getByTestId } = render(
      <UserTable
        users={defaultUsers}
        isLoading={true}
        isAdmin={true}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        handleSendEmailClick={handleSendEmailClick}
      />
    )

    const button = getByTestId('email')
    fireEvent.click(button)

    expect(handleSendEmailClick).toHaveBeenCalled()
    expect(handleEditClick).not.toHaveBeenCalled()
    expect(handleDeleteClick).not.toHaveBeenCalled()
  })
})
