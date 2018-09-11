import app from '../app'
import supertest from 'supertest'

const server = app.listen()
const request = supertest.agent(server)

afterAll(async () => {
  server.close()
})

test('/update should update user details', async () => {
  await request
    .post('/update', {})
    .expect(501)
})

test('/delete should remove a user from the db', async () => {
  await request
    .post('/delete')
    .expect(501)
})

test('/authenticate should authenticate a valid user', async () => {
  await request
    .get(`/authenticate`)
    .expect(501)
})

test('/authenticate should reject an invalid user', async () => {
  await request
    .get(`/authenticate`)
    .expect(501)
})

test('/sendEmail should dispatch email to provided email address', async () => {
  await request
    .post(`/sendEmail`, {})
    .expect(501)
})
