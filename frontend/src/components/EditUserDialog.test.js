import React from 'react'
import {
  cleanup,
  render,
  bindElementToQueries,
  fireEvent
} from 'react-testing-library'

import EditUserDialog from './EditUserDialog'

import 'jest-dom/extend-expect'

afterEach(cleanup)

describe('EditUserDialog', () => {
  it('should only be shown when open=true', () => {
    const { queryByTestId, getByTestId } = bindElementToQueries(document.body)

    const { rerender } = render(<EditUserDialog open={false} />)
    expect(queryByTestId('edit-user-dialog')).toBeNull()

    rerender(<EditUserDialog open={true} />)
    expect(getByTestId('edit-user-dialog')).toBeInTheDocument()
  })

  it('should save any data the user entered when the save button is pressed', () => {
    const save = jest.fn()
    const { getByLabelText, getByTestId } = render(
      <EditUserDialog open={true} onSave={save} />
    )

    const firstName = 'John'
    const lastName = 'Doe'

    const firstInput = getByLabelText('First')
    const lastInput = getByLabelText('Last')

    fireEvent.change(firstInput, { target: { value: firstName } })
    fireEvent.change(lastInput, { target: { value: lastName } })

    expect(firstInput.value).toEqual(firstName)
    expect(lastInput.value).toEqual(lastName)

    const button = getByTestId('save')
    fireEvent.click(button)

    expect(save).toHaveBeenCalledWith({
      firstName,
      lastName,
      emailAddress: '',
      imageURL: ''
    })
  })

  it('Closes without saving when the close button is pressed', () => {
    const save = jest.fn()
    const close = jest.fn()
    const { getByTestId } = render(
      <EditUserDialog open={true} onSave={save} onClose={close} />
    )

    const button = getByTestId('close')
    fireEvent.click(button)

    expect(save).not.toHaveBeenCalled()
    expect(close).toHaveBeenCalled()
  })

  it('Opens with values if the user is editing existing details', () => {
    const firstName = 'John'
    const lastName = 'Doe'
    const imageURL = 'https://api.adorable.io/avatars/285/abott@adorable.png'
    const emailAddress = 'john.doe@example.com'

    const { getByLabelText } = render(
      <EditUserDialog
        open={true}
        firstName={firstName}
        lastName={lastName}
        imageURL={imageURL}
        emailAddress={emailAddress}
      />
    )

    const firstInput = getByLabelText('First')
    const lastInput = getByLabelText('Last')
    const avatarInput = getByLabelText('Avatar URL')
    const emailInput = getByLabelText('Email')

    expect(firstInput.value).toEqual(firstName)
    expect(lastInput.value).toEqual(lastName)
    expect(avatarInput.value).toEqual(imageURL)
    expect(emailInput.value).toEqual(emailAddress)
  })

  it('should match the snapshot', () => {
    const { baseElement } = render(<EditUserDialog open={true} />)
    expect(baseElement).toMatchSnapshot()
  })
})
