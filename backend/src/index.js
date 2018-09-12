/* Application Index
 * Entry point for backend
 */

import app from './app'

const port = process.env.PORT || 3500
console.log('Application starting on port', port)

app.listen(port)
