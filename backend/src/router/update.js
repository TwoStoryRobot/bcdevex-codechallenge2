/* Update router
 * Update a user profile
 */

import Joi from 'joi'
import Router from 'koa-router'
import { queries } from '../db'

const schema = Joi.object().keys({
  userId: Joi.string().required(),
  emailAddress: Joi.string().email().allow(''),
  imageURL: Joi.string().uri().allow(''),
  firstName: Joi.string().required(),
  lastName: Joi.string().allow(''),
  isAdmin: Joi.boolean().required(),
  registeredAt: Joi.date()
})

const update = Router()

async function updateUser(ctx) {
  const result = schema.validate(ctx.request.body)
  if (result.error) ctx.throw(400, result.error)

  const user = ctx.request.body

  // Check privileges 
  const isAdmin = ctx.state.isAdmin
  const selfUpdate = user.userId == ctx.state.user.sub
  if (!selfUpdate && !isAdmin) ctx.throw(400, 'You can\'t update this user')

  // Invalid userId provided
  const record = await queries.selectUserById(user.userId)
  if (!record) ctx.throw(400, 'Invalid userId')

  await queries.updateUser(user)
  ctx.body = ctx.request.body
}

update.post('/', updateUser)

export default update
