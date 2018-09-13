/* Update router tests
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

  // Start test with a clean db state
  await db.none('TRUNCATE public.user')

  // Setup postAgent
  postAgent = supertest
    .agent(server)
    .post('/update')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + generateToken())

  // Insert test data
  await Promise.all([
    queries.insertUser(generateUser({ userId : '1' })),
    queries.insertUser(generateUser({ userId : '2' })),
    queries.insertUser(generateUser({ userId: 'admin', isAdmin : true }))
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

test('/update should update user details', async () => {
  const user = generateUser({ emailAddress: 'new@address.com' })
  await postAgent
    .send(user)
    .expect(200, user)
})

test('/update should reject invalid requests', async () => {
  await postAgent
    .send({})
    .expect(400)
})

test('/update should reject non-existant userIds', async () => {
  const user = generateUser({ userId: '3' })
  await postAgent
    .send(user)
    .set('Authorization', 'Bearer ' + generateToken('3'))
    .expect(400, 'Invalid userId')
})

test('/update should reject a user updating another user', async () => {
  const user = generateUser({ userId: '2' })
  await postAgent
    .send(user)
    .expect(400, 'You can\'t update this user')
})

test('/update should allow admins to update another user', async () => {
  const user = generateUser({ userId: '2' })
  await postAgent
    .send(user)
    .set('Authorization', 'Bearer ' + generateToken('admin'))
    .expect(200, user)
})
