
/* Private Page
 * Demo private page
 */

import React from 'react'
import { UserConsumer } from './UserContext'

const Private = () => (
  <UserConsumer>
    {({ logout }) => (
      <button onClick={logout}>Logout</button>
    )}
  </UserConsumer>
)

export default Private
