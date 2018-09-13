/* Update router
 * Update a user profile
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

const update = Router()

async function updateUser(ctx) {
  const result = schema.validate(ctx.request.body)
  if (result.error) ctx.throw(400, result.error)

  const user = ctx.request.body

  // Invalid userId provided
  const record = await queries.selectUserById(user.userId)
  if (!record) ctx.throw(400, 'Invalid userId')

  await queries.updateUser(user)
  ctx.body = ctx.request.body
}

update.post('/', updateUser)

export default update
