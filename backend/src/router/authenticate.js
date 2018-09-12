
/* Authenticate router
 * Authenticate a user with a provider
 */

import Router from 'koa-router'
import { queries } from '../db'

const authenticate = Router()

async function authenticateUser(ctx) {
  const stateUserId = ctx.state.user.sub
  const bodyUserId = ctx.request.body.userId
  const record = await queries.selectUserById(stateUserId)
  if (bodyUserId != stateUserId) ctx.throw(400, 'You can only self-register')
  if (record) ctx.throw(400, 'You are already registered')
  await queries.insertUser(ctx.request.body)
  ctx.body = ctx.request.body
}

authenticate.post('/', authenticateUser)

export default authenticate
