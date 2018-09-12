
/* Select router
 * Fetch all user profiles
 * 'fetch' is a reserved word in JS, so we use an alternate name
 */

import Router from 'koa-router'
import { queries } from '../db'

const select = Router()

async function selectUsers(ctx) {
  const users = await queries.selectAllUsers()
  ctx.body = users
}

select.get('/', selectUsers)

export default select
