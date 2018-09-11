import React from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'

import AlertDialog from './AlertDialog'

afterEach(cleanup)

test('should render with required props', async () => {
  const { getByTestId } = render(
    <AlertDialog open={true} onCancel={jest.fn()} onConfirm={jest.fn()}>
      Are you TESTING?
    </AlertDialog>
  )

  // AlertDialog wraps Dialog which is a modal and renders using a portal
  // must get by testid to find the element in the document
  expect(getByTestId('alert-dialog')).toMatchSnapshot()
})

test('should call onCancel when labeled cancel clicked', async () => {
  const mockCancel = jest.fn()
  const { getByText } = render(
    <AlertDialog
      open={true}
      cancelLabel="TESTCANCEL"
      onCancel={mockCancel}
      onConfirm={jest.fn()}
    />
  )

  fireEvent.click(getByText('TESTCANCEL'))

  expect(mockCancel).toHaveBeenCalled()
})

test('should call onConfirm when labeled confirm clicked', async () => {
  const mockConfirm = jest.fn()
  const { getByText } = render(
    <AlertDialog
      open={true}
      onCancel={jest.fn()}
      confirmLabel="TESTCONFIRM"
      onConfirm={mockConfirm}
    />
  )

  fireEvent.click(getByText('TESTCONFIRM'))

  expect(mockConfirm).toHaveBeenCalled()
})
