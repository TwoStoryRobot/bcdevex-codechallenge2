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
  state = {
    value: this.props.value
  }

  handleChange = e => {
    const value = e.target.value
    this.setState({ value })
    this.props.onChange(value)
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state.value)
  }

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
        <form data-testid="search-form" onSubmit={this.handleSubmit}>
          <FormControl>
            <Input
              disableUnderline
              placeholder="Filter"
              endAdornment={searchAdornment}
              value={this.state.value}
              onChange={this.handleChange}
            />
          </FormControl>
        </form>
      </PaddedPaper>
    )
  }
}

SearchBar.propTypes = {
  value: PropTypes.string,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func
}

SearchBar.defaultProps = {
  value: '',
  onSubmit: () => {},
  onChange: () => {}
}

export default SearchBar
