
/* SendEmail router
 * Sends an email to a user
 */

import Router from 'koa-router'

const sendEmail = Router()

function emailUser(ctx, next) {
  ctx.status = 501
  throw new Error('Not implemented')
}

sendEmail.all('/', emailUser)

export default sendEmail
