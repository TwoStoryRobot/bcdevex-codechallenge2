/* Remove router
 * Delete a user profile
 * 'delete' is a reserved word in JS, so we use the alternate name
 */

import Joi from 'joi'
import Router from 'koa-router'
import { queries } from '../db'

const schema = Joi.object().keys({
  userId: Joi.string().required(),
  emailAddress: Joi.string().email().required(),
  imageURL: Joi.string().uri().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  isAdmin: Joi.boolean().required(),
  registeredAt: Joi.date().required()
})

const remove = Router()

async function removeUser(ctx) {
  const result = schema.validate(ctx.request.body)
  if (result.error) ctx.throw(400, result.error)

  const { userId } = ctx.request.body

  // Check privileges 
  const isAdmin = ctx.state.isAdmin
  const selfRemoval = userId == ctx.state.user.sub
  if (!selfRemoval && !isAdmin) ctx.throw(400, 'You can\'t delete this user')

  // Invalid userId provided
  const record = await queries.selectUserById(userId)
  if (!record) ctx.throw(400, 'Invalid userId')

  await queries.removeUser(userId)
  ctx.body = ctx.request.body
}

remove.post('/', removeUser)

export default remove
