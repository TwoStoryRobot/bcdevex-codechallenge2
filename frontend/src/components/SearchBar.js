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
  padding: 0 32px;
`

class SearchBar extends React.Component {
  render() {
    const searchAdornment = (
      <InputAdornment position="end">
        <IconButton>
          <SearchIcon />
        </IconButton>
      </InputAdornment>
    )
    return (
      <PaddedPaper>
        <FormControl>
          <Input
            disableUnderline
            placeholder="Filter"
            endAdornment={searchAdornment}
          />
        </FormControl>
      </PaddedPaper>
    )
  }
}

export default SearchBar
