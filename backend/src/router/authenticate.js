/* Authenticate router
 * Authenticate a user with a provider
 */

import Joi from 'joi'
import Router from 'koa-router'
import moment from 'moment'
import { queries } from '../db'

const schema = Joi.object().keys({
  userId: Joi.string().required(),
  emailAddress: Joi.string()
    .email()
    .allow(''),
  imageURL: Joi.string()
    .uri()
    .allow(''),
  firstName: Joi.string().required(),
  lastName: Joi.string().allow('')
})

const authenticate = Router()

async function authenticateUser(ctx) {
  const result = schema.validate(ctx.request.body)
  if (result.error) ctx.throw(400, result.error)

  const stateUserId = ctx.state.user.sub
  const bodyUserId = ctx.request.body.userId
  if (bodyUserId != stateUserId) ctx.throw(400, 'You can only self-register')

  const adminCount = await queries.countAdmins()
  if (adminCount.count == 0) ctx.request.body.isAdmin = true
  else ctx.request.body.isAdmin = false

  const record = await queries.selectUserById(stateUserId)
  if (!record)
    await queries.insertUser(
      Object.assign(ctx.request.body, { registeredAt: moment().format() })
    )

  ctx.body = record || ctx.request.body
}

authenticate.post('/', authenticateUser)

export default authenticate
