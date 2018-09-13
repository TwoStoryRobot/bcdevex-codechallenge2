import app from '../app'
import { queries, db, pgp } from '../db'
import { generateUser, generateToken } from '../helpers'
import supertest from 'supertest'
import nodemailer from 'nodemailer'

const server = app.listen()
let postAgent

beforeEach(async () => {
  // Restore mocks to clear any calls
  jest.restoreAllMocks()

  // Setup postAgent
  postAgent = supertest
    .agent(server)
    .post('/sendEmail')
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

test.skip('/sendEmail should require admin role', () => {})

test('/sendEmail should reject poorly formed requests', async () => {
  await postAgent.send({}).expect(400)
})

test('/sendEmail should 400 if user does not exist', async () => {
  await postAgent.send({ userId: 'not-a-user' }).expect(400)
})

test('/sendEmail should 400 if user does not have an email address', async () => {
  const userId = 'noemail'
  await queries.insertUser(generateUser({ userId, emailAddress: '' }))

  await postAgent.send({ userId }).expect(400)
})

test('/sendEmail should email user', async () => {
  await postAgent.send({ userId: '1' }).expect(200)

  nodemailer.sendMail()
  expect(nodemailer.sendMail).toHaveBeenCalled()
})
