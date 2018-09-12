
/* Authenticate router
 * Authenticate a user with a provider
 */

import Router from 'koa-router'
import { queries } from '../db'

const authenticate = Router()

async function authenticateUser(ctx) {
  await queries.insertUser(ctx.request.body)
  ctx.body = ctx.request.body
}

authenticate.post('/', authenticateUser)

export default authenticate
