import React from 'react'
import { cleanup, render, fireEvent } from 'react-testing-library'

import AppBar from './AppBar'

import 'jest-dom/extend-expect'

afterEach(cleanup)

describe('AppBar', () => {
  it('should match the snapshot', () => {
    const { container } = render(
      <AppBar
        title="Code Challenge"
        avatar="https://api.adorable.io/avatars/285/abott@adorable.png"
        name="Jane Doe"
      />
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should open the menu when the avatar is clicked', () => {
    const { getByTestId, queryByTestId } = render(
      <AppBar
        avatar="https://api.adorable.io/avatars/285/abott@adorable.png"
        name="Jane Doe"
      />
    )

    expect(queryByTestId('profile-menu')).toBeNull()

    fireEvent.click(getByTestId('avatar-button'))

    expect(getByTestId('profile-menu')).toBeVisible()
  })

  it('should close the menu when an action is selected', () => {
    const { getByTestId, queryByTestId } = render(
      <AppBar
        avatar="https://api.adorable.io/avatars/285/abott@adorable.png"
        name="Jane Doe"
      />
    )

    fireEvent.click(getByTestId('avatar-button'))
    fireEvent.click(getByTestId('edit'))

    expect(queryByTestId('profile-menu').firstChild).toHaveStyle('opacity: 0')
  })

  it('should fire the proper menu actions', () => {
    const edit = jest.fn()
    const signout = jest.fn()

    const { getByTestId } = render(
      <AppBar
        avatar="https://api.adorable.io/avatars/285/abott@adorable.png"
        name="Jane Doe"
        onEdit={edit}
        onSignOut={signout}
      />
    )

    // The menu has to be opened for each test because it closes automatically when
    // a MenuItem is selected
    const openMenu = () => fireEvent.click(getByTestId('avatar-button'))

    openMenu()
    fireEvent.click(getByTestId('edit'))
    expect(edit).toHaveBeenCalled()

    openMenu()
    fireEvent.click(getByTestId('signout'))
    expect(signout).toHaveBeenCalled()
  })
})
