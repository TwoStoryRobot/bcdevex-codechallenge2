
/* Update router
 * Update a user profile
 */

import Router from 'koa-router'

const update = Router()

function updateUser(ctx, next) {
  ctx.status = 501
  throw new Error('Not implemented')
}

update.all('/', updateUser)

export default update
