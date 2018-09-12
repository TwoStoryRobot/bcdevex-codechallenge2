/* Private Route
 * Redirects away from this route if the 
 * user is not logged into the application
 */

import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { UserConsumer } from './UserContext'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <UserConsumer>
    {({ isLoggedIn, userId }) => (
      <Route
        {...rest}
        render={props =>
          isLoggedIn ? (
            <Component {...props} userId={userId} />
          ) : (
            <Redirect
              to={{
                pathname: '/'
              }}
            />
          )
        }
      />
    )}
  </UserConsumer>
)

export default PrivateRoute
