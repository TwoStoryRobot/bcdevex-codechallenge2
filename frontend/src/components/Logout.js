import React from 'react'
import PropTypes from 'prop-types'
import { withUserContext } from './UserContext'

class Logout extends React.Component {
  componentDidMount() {
    this.props.logout()
    this.props.history.replace('/')
  }

  render() {
    return null
  }
}

Logout.propTypes = {
  history: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

export default withUserContext(Logout)
