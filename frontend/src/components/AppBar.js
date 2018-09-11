import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Toolbar from '@material-ui/core/Toolbar'
import MAppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import IconButton  from '@material-ui/core/IconButton'
import Avatar  from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItem from '@material-ui/core/ListItem'
import styled from 'styled-components'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import EditIcon from '@material-ui/icons/Edit'
import ExitToApp from '@material-ui/icons/ExitToApp'

const Grow = styled.div`
  flex-grow: 1;
`

const MenuHeader = styled(ListItem)`
  &:focus {
    outline: none
  }
  color: ${({ theme }) => theme.primary};
`

export default class AppBar extends Component {
  state = {
    anchorEl: null,
  }

  handleMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleMenuClose = () => {
    this.setState({ anchorEl: null })
  }

  handleMenuItemClick = cb => () => {
    this.handleMenuClose()
    cb()
  }
  
  render() {
    const { anchorEl } = this.state
    const { title, avatar, name, onEdit, onSignOut } = this.props
    const isMenuOpen = !!anchorEl

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuHeader divider>
          <ListItemAvatar>
            <Avatar src={avatar} />
          </ListItemAvatar>
          <ListItemText primary={name} />
        </MenuHeader>
        <ListItem button onClick={this.handleMenuItemClick(onEdit)}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText inset primary="Edit profile" />
        </ListItem>
        <ListItem button onClick={this.handleMenuItemClick(onSignOut)}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText inset primary="Sign out" />
        </ListItem>
      </Menu>
    )

    return (
      <React.Fragment>
        <MAppBar>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              {title}
            </Typography>
            <Grow />
            <div>
              <IconButton onClick={this.handleMenuOpen}>
                <Avatar src={avatar} />
              </IconButton>
            </div>
          </Toolbar>
        </MAppBar>
        {renderMenu}
      </React.Fragment>
    )
  }
}

AppBar.propTypes = {
  title: PropTypes.string,
  avatar: PropTypes.string,
  name: PropTypes.string,
  onEdit: PropTypes.func,
  onSignOut: PropTypes.func,
}

AppBar.defaultProps = {
  title: '',
  avatar: '',
  name: '',
}