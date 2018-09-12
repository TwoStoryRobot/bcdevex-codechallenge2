import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Paper from '@material-ui/core/Paper'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from 'mdi-react/SearchIcon'

const PaddedPaper = styled(Paper)`
  padding: 0 8px;
`

/**
 * A searchbar that works like an input
 *
 * This is a controlled component that is expecting you to pass in a value
 * and an onChange handler
 */
class SearchBar extends React.Component {
  render() {
    const searchAdornment = (
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
    )
    return (
      <PaddedPaper>
        <FormControl>
          <Input
            disableUnderline
            placeholder="Filter"
            startAdornment={searchAdornment}
            value={this.props.value}
            onChange={this.props.onChange}
          />
        </FormControl>
      </PaddedPaper>
    )
  }
}

SearchBar.propTypes = {
  /** value for the search input */
  value: PropTypes.string.isRequired,
  /** called whenever user changes the text, like an other input */
  onChange: PropTypes.func.isRequired
}

export default SearchBar
