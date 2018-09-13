/* Admin Check
 * Adds a parameter for whether or not the user is an admin
 */

import { queries } from './db'

async function adminCheck(ctx, next) {
  const userId = ctx.state.user.sub
  const record = await queries.selectUserById(userId)
  ctx.state.isAdmin = record && record.isAdmin ? true : false
  await next()
}

export default () => adminCheck
