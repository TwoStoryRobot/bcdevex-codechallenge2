/* Authenticate router
 * Authenticate a user with a provider
 */

import Router from 'koa-router'
import moment from 'moment'
import { queries } from '../db'

const authenticate = Router()

async function authenticateUser(ctx) {
  const stateUserId = ctx.state.user.sub
  const bodyUserId = ctx.request.body.userId
  const record = await queries.selectUserById(stateUserId)
  if (bodyUserId != stateUserId) ctx.throw(400, 'You can only self-register')
  if (!record)
    await queries.insertUser(
      Object.assign(ctx.request.body, { registeredAt: moment().format() })
    )
  ctx.body = record || ctx.request.body
}

authenticate.post('/', authenticateUser)

export default authenticate
