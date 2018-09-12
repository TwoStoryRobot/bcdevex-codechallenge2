/* Application
 * Main API Koa Router
 */

import Koa from 'koa'
import jwt from 'koa-jwt'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import { koaJwtSecret } from 'jwks-rsa'
import root from './router/root'

const isTest = process.env.NODE_ENV == 'test'

// JWT config
const cache = true
const jwksUri = 'https://www.googleapis.com/oauth2/v3/certs'
const jwksSecret = koaJwtSecret({ jwksUri, cache })
const secret = isTest ? 'test_secret' : jwksSecret
const audience = process.env.CLIENT_ID
const issuer = 'accounts.google.com'

// CORS config
const origin = process.env.CORS_ORIGIN

const app = new Koa()
app.use(bodyParser())
app.use(cors({ origin })) 
app.use(jwt({ secret, audience, issuer }))
app.use(root.routes())
app.use(root.allowedMethods())

module.exports = app
