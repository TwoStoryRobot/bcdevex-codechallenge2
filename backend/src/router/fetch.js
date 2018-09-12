
/* Select router
 * Fetch all user profiles
 * 'fetch' is a reserved word in JS, so we use an alternate name
 */

import Router from 'koa-router'
import { queries } from '../db'

const fetch = Router()

async function fetchUsers(ctx) {
  const users = await queries.selectAllUsers()
  ctx.body = users
}

fetch.get('/', fetchUsers)

export default fetch
