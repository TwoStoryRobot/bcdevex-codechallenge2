import app from '../app'
import { queries, db, pgp } from '../db'
import { generateUser, generateNewUser, generateToken } from '../helpers'
import supertest from 'supertest'

const server = app.listen()
const request = supertest.agent(server)

jest.mock('moment', () => () => ({ format: () => '2018-09-12T14:35:38-07:00' }))

beforeEach(async () => {
  // Start test with a clean db state
  await db.none('TRUNCATE public.user')

  const testUser1 = generateUser({ userId: '1' })
  const testUser2 = generateUser({ userId: '2' })
  const userList = [testUser1, testUser2]
  const all = userList.map(queries.insertUser)
  await Promise.all(all)
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

  await request
    .get('/fetch')
    .set('Authorization', 'Bearer ' + generateToken())
    .expect(200, users)
})

test('/update should update user details', async () => {
  const user = generateUser({ emailAddress: 'new@address.com' })

  await request
    .post('/update')
    .send(user)
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + generateToken())
    .expect(200, user)
})

test('/update should return 400 when no userId is provided', async () => {
  await request
    .post('/update')
    .send({})
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + generateToken())
    .expect(400, 'No userId provided')
})

test('/update should return 400 when non-existant userId is provided', async () => {
  await request
    .post('/update')
    .send({ userId: '3' })
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + generateToken())
    .expect(400, 'Invalid userId')
})

test('/update should return 400 when an invalid body is sent', async () => {
  await request
    .post('/update')
    .send({ userId: '1' })
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + generateToken())
    .expect(400)
})

test('/delete should remove a user from the db', async () => {
  const body = { userId: '1' }

  await request
    .post('/delete')
    .send(body)
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + generateToken())
    .expect(200, body)
})

test('/delete should return 400 when no userId is provided', async () => {
  await request
    .post('/delete')
    .send({})
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + generateToken())
    .expect(400, 'No userId provided')
})

test('/delete should return 400 when non-existant userId is provided', async () => {
  await request
    .post('/delete')
    .send({ userId: '3' })
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + generateToken())
    .expect(400, 'Invalid userId')
})

test('/authenticate should authenticate a valid user', async () => {
  const user = generateNewUser({ userId: 'doesntExist' })
  const response = { isAdmin : true }

  await request
    .post('/authenticate')
    .send(user)
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + generateToken('doesntExist'))
    .expect(200, Object.assign(user, response))
})

test('/authenticate should return preexisting users', async () => {
  const oldUser = generateUser()
  const newUser = generateNewUser()

  await request
    .post('/authenticate')
    .send(newUser)
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + generateToken())
    .expect(200, oldUser)
})

test('/authenticate should make secondary users non-admin', async () => {
  const user1 = generateNewUser({ userId: 'firstUser' })
  const response1 = { isAdmin : true }

  await request
    .post('/authenticate')
    .send(user1)
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + generateToken('firstUser'))
    .expect(200, Object.assign(user1, response1))

  const user2 = generateNewUser({ userId: 'secondUser' })
  const response2 = { isAdmin : false }

  await request
    .post('/authenticate')
    .send(user2)
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + generateToken('secondUser'))
    .expect(200, Object.assign(user2, response2))
})

test('/authenticate should reject non-matching userIds', async () => {
  const user = generateUser({ id: 'badMatch1' })

  await request
    .post('/authenticate')
    .send(user)
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + generateToken('badMatch2'))
    .expect(400, 'You can only self-register')
})
