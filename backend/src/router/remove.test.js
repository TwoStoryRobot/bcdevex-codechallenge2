/* Delete router tests
 */

import app from '../app'
import { queries, db, pgp } from '../db'
import { generateUser, generateToken } from '../helpers'
import supertest from 'supertest'

let postAgent
const server = app.listen()

beforeEach(async () => {
  // Restore mocks to clear any calls
  jest.restoreAllMocks()

  // Setup postAgent
  postAgent = supertest
    .agent(server)
    .post('/delete')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + generateToken())

  // Start test with a clean db state
  await db.none('TRUNCATE public.user')

  await Promise.all([
    queries.insertUser(generateUser({ userId: '1' })),
    queries.insertUser(generateUser({ userId: '2' }))
  ])
})

afterAll(async () => {
  // Close the server connection
  server.close()

  // Return db to clean state
  await db.none('TRUNCATE public.user')

  // Close the pgp connection
  await pgp.end()
})

test('/delete should remove a user from the db', async () => {
  const body = generateUser()

  await postAgent
    .send(body)
    .expect(200, body)
})

test('/delete should return 400 for poorly formed queries', async () => {
  await postAgent
    .send({})
    .expect(400)
})

test('/delete should return 400 when non-existant userId is provided', async () => {
  await postAgent
    .send(generateUser({ userId: '3' }))
    .expect(400, 'Invalid userId')
})
