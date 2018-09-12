
/* Remove router
 * Delete a user profile
 * 'delete' is a reserved word in JS, so we use the alternate name
 */

import Router from 'koa-router'
import { queries } from '../db'

const remove = Router()

async function removeUser(ctx) {
  const { userId } = ctx.request.body

  // No userId provided
  ctx.assert(ctx.request.body.userId, 400, 'No userId provided')

  // Invalid userId provided
  const record = await queries.selectUserById(userId)
  if (!record)
    ctx.throw(400, 'Invalid userId')

  try {
    await queries.deleteUser(userId)
    ctx.body = ctx.request.body
  } catch (e) {
    ctx.throw(400, e.message)
  }
}

remove.post('/', removeUser)

export default remove
