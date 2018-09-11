
/* Authenticate router
 * Authenticate a user with a provider
 */

import Router from 'koa-router'

const authenticate = Router()

function authenticateUser(ctx, next) {
  ctx.status = 501
  ctx.throw(501, 'Not implemented')
}

authenticate.all('/', authenticateUser)

export default authenticate
