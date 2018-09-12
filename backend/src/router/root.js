/* Root Router
 * Main router to connect routes
 */

import Router from 'koa-router'
import sendEmail from './sendEmail'
import authenticate from './authenticate'
import remove from './remove'
import update from './update'
import fetch from './fetch'

const root = Router()

root.use('/sendEmail', sendEmail.routes(), sendEmail.allowedMethods())
root.use('/authenticate', authenticate.routes(), authenticate.allowedMethods())
root.use('/delete', remove.routes(), remove.allowedMethods())
root.use('/update', update.routes(), update.allowedMethods())
root.use('/fetch', fetch.routes(), fetch.allowedMethods())

export default root
