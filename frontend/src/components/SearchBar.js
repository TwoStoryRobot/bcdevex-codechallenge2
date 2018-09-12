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
    text: this.props.text
  }

  handleChange = e => {
    const text = e.target.value
    this.setState({ text })
    this.props.onChange(text)
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state.text)
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
              value={this.state.text}
              onChange={this.handleChange}
            />
          </FormControl>
        </form>
      </PaddedPaper>
    )
  }
}

SearchBar.propTypes = {
  text: PropTypes.string,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func
}

SearchBar.defaultProps = {
  text: '',
  onSubmit: () => {},
  onChange: () => {}
}

export default SearchBar
