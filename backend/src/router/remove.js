
/* Remove router
 * Delete a user profile
 * 'delete' is a reserved word in JS, so we use the alternate name
 */

import Router from 'koa-router'

const remove = Router()

function removeUser(ctx, next) {
  ctx.status = 501
  ctx.throw(501, 'Not implemented')
}

remove.all('/', removeUser)

export default remove
