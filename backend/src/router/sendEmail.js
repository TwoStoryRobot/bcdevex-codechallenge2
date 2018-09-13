/* SendEmail router
 * Sends a boilerplate email to a user
 */

import fs from 'fs'
import Joi from 'joi'
import path from 'path'
import Router from 'koa-router'
import nodemailer from 'nodemailer'
import { queries } from '../db'

const transporter = nodemailer.createTransport(process.env.SMTP)
const boilerplateEmailBody = fs.readFileSync(
  path.resolve(__dirname, '../../email-message.txt'),
  'utf-8'
)

const schema = Joi.object().keys({
  userId: Joi.string().required()
})

const sendEmail = Router()

async function emailUser(ctx) {
  ctx.assert(ctx.state.isAdmin, 403)

  const result = schema.validate(ctx.request.body)
  if (result.error) ctx.throw(400, result.error)

  const { userId } = ctx.request.body

  const user = await queries.selectUserById(userId)
  ctx.assert(user, 400, 'User does not exist')
  ctx.assert(user.emailAddress, 400, 'User does not have an email address')

  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: user.emailAddress,
    subject: 'Hello Code Challenge User',
    text: boilerplateEmailBody
  }
  await transporter.sendMail(mailOptions)

  ctx.status = 200
}

sendEmail.post('/', emailUser)

export default sendEmail
