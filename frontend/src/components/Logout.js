/* Logout Button
 * Logs a user out and redirects to main page
 */

import React from 'react'
import PropTypes from 'prop-types'
import { withAuthContext } from './AuthContext'

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

export default withAuthContext(Logout)
