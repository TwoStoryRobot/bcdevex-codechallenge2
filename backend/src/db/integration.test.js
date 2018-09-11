import { queries, db, pgp } from './index'

function generateUser(obj = {}) {
  const defaultUser = {
    userId: '1',
    firstName: 'Test',
    imageUrl: 'https://previews.123rf.com/images/triken/triken1608/triken160800028/61320729-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg',
    emailAddress: 'test@user1.com',
    lastName: 'User'
  }
  return Object.assign({}, defaultUser, obj)
}

beforeEach(async () => {
  /*
   * Start test with clean db state
   */
  await db.none('TRUNCATE public.user')
})

afterAll(async () => {
  /*
   * Close the pgp connection
   */
  await pgp.end()
})

test('selectAllUsers should gets all users', async () => {
  const testUser1 = generateUser({ userId: '1' })
  const testUser2 = generateUser({ userId: '2' })
  const userList = [testUser1, testUser2]
  const all = userList.map(queries.insertUser)
  await Promise.all(all)

  const users = await queries.selectAllUsers()
  expect(users).toHaveLength(2)
})

test('insertUser creates a user record', async () => {
  const user = generateUser()
  await queries.insertUser(user)

  const users = await queries.selectAllUsers()
  const userIds = users.map(u => u.userId)
  expect(users).toHaveLength(1)
  expect(userIds).toContain('1')
})

/* TODO: add test */
test.skip('** gets a user by ID', async () => {})

/* TODO: add test */
test.skip('** update the user details', async () => {})

/* TODO: add test */
test.skip('** removes a user from the db', async () => {})
