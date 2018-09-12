
/* Authenticate router
 * Authenticate a user with a provider
 */

import Router from 'koa-router'
import { queries } from '../db'

const authenticate = Router()

async function authenticateUser(ctx) {

  const stateUserId = ctx.state.user.sub
  const bodyUserId = ctx.request.body.userId
  if (bodyUserId != stateUserId) ctx.throw(400, 'You can only self-register')

  const adminCount = await queries.countAdmins()
  if (adminCount == 0) ctx.request.body.isAdmin = true
  else ctx.request.body.isAdmin = false

  const record = await queries.selectUserById(stateUserId)
  if (!record) await queries.insertUser(ctx.request.body)

  ctx.body = record || ctx.request.body

}

authenticate.post('/', authenticateUser)

export default authenticate
