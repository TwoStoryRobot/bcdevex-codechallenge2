import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Toolbar from '@material-ui/core/Toolbar'
import MAppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItem from '@material-ui/core/ListItem'
import styled from 'styled-components'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Fade from '@material-ui/core/Fade'
import EditIcon from 'mdi-react/EditIcon'
import SignOutIcon from 'mdi-react/LogoutIcon'
import Avatar from 'react-avatar'

const Grow = styled.div`
  flex-grow: 1;
`

const MenuHeader = styled(ListItem)`
  &:focus {
    outline: none;
  }
`

export default class AppBar extends Component {
  state = {
    anchorEl: null
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
        data-testid="profile-menu">
        <MenuHeader divider>
          <ListItemAvatar>
            <Avatar round size="40" src={avatar} name={name} />
          </ListItemAvatar>
          <ListItemText primary={name} />
        </MenuHeader>
        <ListItem
          button
          onClick={this.handleMenuItemClick(onEdit)}
          data-testid="edit">
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText inset primary="Edit profile" />
        </ListItem>
        <ListItem
          button
          onClick={this.handleMenuItemClick(onSignOut)}
          data-testid="signout">
          <ListItemIcon>
            <SignOutIcon />
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
            {avatar &&
              name && (
                <div>
                  <IconButton
                    onClick={this.handleMenuOpen}
                    data-testid="avatar-button">
                    <Fade in={!isMenuOpen}>
                      <Avatar
                        round
                        size="40"
                        src={avatar}
                        name={name}
                        open={isMenuOpen}
                      />
                    </Fade>
                  </IconButton>
                </div>
              )}
          </Toolbar>
        </MAppBar>
        {renderMenu}
      </React.Fragment>
    )
  }
}

AppBar.propTypes = {
  /** Title to display */
  title: PropTypes.string,
  /** URL of avatar */
  avatar: PropTypes.string,
  /** Name of the user to display in the profile menu */
  name: PropTypes.string,
  /** Handler called when the `Edit` menu button is pressed */
  onEdit: PropTypes.func,
  /** Handler called when the `Sign out` menu button is pressed */
  onSignOut: PropTypes.func
}

AppBar.defaultProps = {
  title: '',
  avatar: '',
  name: ''
}
