
/* Remove router
 * Delete a user profile
 * 'delete' is a reserved word in JS, so we use the alternate name
 */

import Router from 'koa-router'
import { queries } from '../db'

const remove = Router()

async function removeUser(ctx, next) {
  const { userId } = ctx.request.body

  // No userId provided
  if (!userId)
    ctx.throw(400, 'No userId provided')

  // Invalid userId provided
  const users = await queries.selectAllUsers()
  const userIds = users.map(u => u.userId)
  if (!userIds.includes(userId))
    ctx.throw(400, 'Invalid userId')

  try {
    await queries.deleteUser(userId)
    ctx.status = 200
    ctx.body = ctx.request.body
  } catch (e) {
    ctx.throw(400, e.message)
  }

  next()
}

remove.all('/', removeUser)

export default remove
