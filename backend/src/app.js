
/* Application
 * Main API Koa Router
 */

import Koa from 'koa'
import root from './router/root'

const app = new Koa()
app.use(root.routes())
app.use(root.allowedMethods())

module.exports = app
