import React from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
import 'jest-dom/extend-expect'

import SearchBar from './SearchBar'

afterEach(cleanup)

describe('SearchBar', () => {
  it('should render with required props', async () => {
    const { container } = render(<SearchBar />)

    expect(container.firstChild).toMatchSnapshot()
  })
})
