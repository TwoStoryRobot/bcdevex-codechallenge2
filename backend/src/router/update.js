
/* Update router
 * Update a user profile
 */

import Router from 'koa-router'
import { queries } from '../db'

const update = Router()

async function updateUser(ctx) {
  const user = ctx.request.body

  // No userId provided
  ctx.assert(user.userId, 400, 'No userId provided')

  // Invalid userId provided
  const record = await queries.selectUserById(user.userId)
  if (!record)
    ctx.throw(400, 'Invalid userId')

  try {
    await queries.updateUser(user)
    ctx.body = ctx.request.body
  } catch (e) {
    ctx.throw(400, e.message)
  }
}

update.post('/', updateUser)

export default update
