/* Authentication router tests
 */

import app from '../app'
import { queries, db, pgp } from '../db'
import { generateUser, generateNewUser, generateToken } from '../testHelpers'
import supertest from 'supertest'
import moment from 'moment'

jest.mock('moment', () => () => ({ format: () => '2018-09-12T14:35:38-07:00' }))

let postAgent
const server = app.listen()

beforeEach(async () => {
  // Restore mocks to clear any calls
  jest.restoreAllMocks()

  // Setup postAgent
  postAgent = supertest
    .agent(server)
    .post('/authenticate')
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

test('/authenticate should authenticate a valid user', async () => {
  const user = generateNewUser({ userId: 'doesntExist' })
  const response = { isAdmin : true, registeredAt : moment().format() }

  await postAgent
    .send(user)
    .set('Authorization', 'Bearer ' + generateToken('doesntExist'))
    .expect(200, Object.assign(user, response))
})

test('/authenticate should return preexisting users', async () => {
  const oldUser = generateUser()
  const newUser = generateNewUser()

  await postAgent
    .send(newUser)
    .expect(200, oldUser)
})

test('/authenticate should make secondary users non-admin', async () => {
  const user1 = generateNewUser({ userId: 'firstUser' })
  const response1 = { isAdmin : true, registeredAt : moment().format() }

  await postAgent
    .send(user1)
    .set('Authorization', 'Bearer ' + generateToken('firstUser'))
    .expect(200, Object.assign(user1, response1))

  const user2 = generateNewUser({ userId: 'secondUser' })
  const response2 = { isAdmin : false, registeredAt : moment().format() }

  await postAgent
    .send(user2)
    .set('Authorization', 'Bearer ' + generateToken('secondUser'))
    .expect(200, Object.assign(user2, response2))
})

test('/authenticate should reject non-matching userIds', async () => {
  const user = generateNewUser({ userId: 'badMatch1' })

  await postAgent
    .send(user)
    .set('Authorization', 'Bearer ' + generateToken('badMatch2'))
    .expect(400, 'You can only self-register')
})

test('/authenticate should reject poorly formed queries', async () => {
  const user = generateNewUser()
  delete user.firstName
  delete user.lastName

  await postAgent
    .send(user)
    .expect(400)
})
