/* Fetch router
 * Fetch all user profiles
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
