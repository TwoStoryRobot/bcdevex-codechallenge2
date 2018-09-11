
/* Application
 * Main API Koa Router
 */

import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import root from './router/root'

const app = new Koa()

app.use(cors()) // TODO: Specify origin
app.use(bodyParser())
app.use(root.routes())
app.use(root.allowedMethods())

module.exports = app
