import React from 'react'
import { cleanup, render } from 'react-testing-library'

import Logout from './Logout'

afterEach(cleanup)

describe('Logout', () => {
  it('should logout and redirect to home page', () => {
    const logout = jest.fn()
    const history = {
      replace: jest.fn()
    }

    render(<Logout {...{ logout, history }} />)

    expect(logout).toHaveBeenCalled()
    expect(history.replace).toHaveBeenCalledWith('/')
  })
})
