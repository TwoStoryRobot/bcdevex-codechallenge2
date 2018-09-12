
/* Update router
 * Update a user profile
 */

import Router from 'koa-router'
import { queries } from '../db'

const update = Router()

async function updateUser(ctx) {
  const user = ctx.request.body

  // No userId provided
  if (!user.userId)
    ctx.throw(400, 'No userId provided')

  // Invalid userId provided
  const users = await queries.selectAllUsers()
  const userIds = users.map(u => u.userId)
  if (!userIds.includes(user.userId))
    ctx.throw(400, 'Invalid userId')

  try {
    await queries.updateUser(user)
    ctx.body = ctx.request.body
  } catch (e) {
    ctx.throw(400, e.message)
  }
}

update.all('/', updateUser)

export default update
