/* Fetch router tests
 */

import app from '../app'
import { queries, db, pgp } from '../db'
import { generateUser, generateToken } from '../testHelpers'
import supertest from 'supertest'

const server = app.listen()
let postAgent

beforeEach(async () => {
  // Restore mocks to clear any calls
  jest.restoreAllMocks()

  // Setup postAgent
  postAgent = supertest
    .agent(server)
    .get('/fetch')
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

test('/fetch should return all users', async () => {
  const users = await queries.selectAllUsers()

  await postAgent.expect(200, users)
})
