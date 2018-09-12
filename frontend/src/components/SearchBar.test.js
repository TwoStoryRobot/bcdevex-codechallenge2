import React from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
import 'jest-dom/extend-expect'

import SearchBar from './SearchBar'

afterEach(cleanup)

describe('SearchBar', () => {
  it('should render with required props', async () => {
    const { container } = render(<SearchBar value="" onChange={jest.fn()} />)

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render with initial value', async () => {
    const { getByPlaceholderText } = render(
      <SearchBar value="initial" onChange={jest.fn()} />
    )

    const input = getByPlaceholderText('Filter')

    expect(input.value).toEqual('initial')
  })

  it('should callback when the user changes the search term', async () => {
    const onChange = jest.fn()
    const { getByPlaceholderText } = render(
      <SearchBar value="initial" onChange={onChange} />
    )

    const input = getByPlaceholderText('Filter')
    fireEvent.change(input, { target: { value: 'term' } })

    expect(onChange).toHaveBeenCalled()
  })
})
