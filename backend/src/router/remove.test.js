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

test('/delete should remove a user from the db', async () => {
  const body = generateUser()

  await postAgent
    .send(body)
    .expect(200, body)
})

test('/delete should reject invalid requests', async () => {
  await postAgent
    .send({})
    .expect(400)
})

test('/delete should reject non-existant userIds', async () => {
  await postAgent
    .send(generateUser({ userId: '3' }))
    .set('Authorization', 'Bearer ' + generateToken('3'))
    .expect(400, 'Invalid userId')
})

test('/delete should reject a user removing another user', async () => {
  const user = generateUser({ userId: '2' })
  await postAgent
    .send(user)
    .expect(400, 'You can\'t delete this user')
})

test('/delete should allow admins to remove another user', async () => {
  const user = generateUser({ userId: '2' })
  await postAgent
    .send(user)
    .set('Authorization', 'Bearer ' + generateToken('admin'))
    .expect(200, user)
})
