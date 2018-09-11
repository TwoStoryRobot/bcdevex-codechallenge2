
/* Authenticate router
 * Authenticate a user with a provider
 */

import Router from 'koa-router'

const authenticate = Router()

function authenticateUser(ctx, next) {
  console.log(ctx.request)
  console.log(ctx.request.body)
  ctx.body = 'Got it'
}

authenticate.all('/', authenticateUser)

export default authenticate
